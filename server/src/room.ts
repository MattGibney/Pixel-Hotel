import { Server } from 'net';
import Hotel from './hotel';
import Client from './client';
import { planPath } from './utils/plotPath';
import { PlayerPos } from './player';


// TODO: Look Direction when chatting
// TODO: Look at objects when clicked
// TODO: Interact with drink vendor
export type RoomDefinition = {
  id: string;
  name: string;
  port: number;

  heightmap: (number | 'X')[][];
  // Public rooms often have multiple entrance tiles. By making this an array,
  // we are open to having players randomly appear on one of them.
  doorPos: PlayerPos[];
  objects: {
    id: string;
    sprite: string;
    type: 'furniture' | 'chair' | 'bed';
    sitOffset?: number; // Only used for chairs and beds, determines the z position of the player when sitting on it
    pos: {
      x: number;
      y: number;
      z: number;
      r: number;
    };
  }[];

  usersMax: number;
  cct: string;
};

export default class Room {
  public hotel: Hotel;

  public id: RoomDefinition['id'];
  public name: RoomDefinition['name'];
  public port: RoomDefinition['port'];
  public heightmap: RoomDefinition['heightmap'];
  public objects: RoomDefinition['objects'];
  public doorPos: RoomDefinition['doorPos'];
  public usersMax: RoomDefinition['usersMax'];
  public cct: RoomDefinition['cct'];

  public status: 'started' | 'stopped' = 'stopped';
  public clients: Client[] = [];

  private server: Server;
  private timer: NodeJS.Timeout | null = null;

  constructor(hotel: Hotel, data: RoomDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.name = data.name;
    this.port = data.port;
    this.heightmap = data.heightmap;
    this.objects = data.objects;
    this.doorPos = data.doorPos;
    this.usersMax = data.usersMax;
    this.cct = data.cct;

    this.server = new Server((socket) => {
      const client = new Client(socket, this);
      this.addClient(client);

      // if the timer is not running, start it
      if (!this.timer) {
        this.startTimer(0.6, this.executeTick.bind(this));
      }

      this.hotel.commandFactory.outgoing.HELLO({ client });

      socket.on('end', () => {
        this.hotel.logger.debug(`Client ${client.id} disconnected from room ${this.id}`);

        this.removeClient(client);

        // if there are no clients left, stop the timer
        if (this.clients.length === 0) {
          this.stopTimer();
        }
      });
    });
  }

  get usersNow(): number {
    return this.clients.length;
  }

  addClient(client: Client) {
    this.clients.push(client);
    this.hotel.logger.debug(`Client ${client.id} added to room ${this.id}`);
  }

  removeClient(client: Client) {
    this.clients = this.clients.filter((c) => c !== client);
    this.hotel.logger.debug(`Client ${client.id} removed from room ${this.id}`);
  }

  chat(client: Client, message: string) {
    if (!client.player) {
      this.hotel.logger.error(`Client ${client.id} does not have a player`);
      return;
    }

    // TODO: Whisper + Shout Support
    // TODO: Players look at speaker when they talk.

    const speaker = client.player.userName;
    // Broadcast the message to all clients in the room
    this.clients.forEach((c) => {
      this.hotel.commandFactory.outgoing.SAY(c, { speaker, message });
    });
  }

  executeTick() {
    // for each client, if the player object has a walkPath, move the player
    this.clients.forEach((client) => {
      if (client.player && client.player.walkPath.length > 0) {
        const nextTile = client.player.walkPath.shift();
        if (nextTile) {
          client.player.isSitting = false;
          client.player.xPos = nextTile.xPos;
          client.player.yPos = nextTile.yPos;
          client.player.zPos = nextTile.zPos;
          client.player.hRot = nextTile.hRot;
          client.player.bRot = nextTile.bRot;

          // If this is the last walk tile and it's a chair, set the player's
          // sitting status to true
          if (client.player.walkPath.length === 0) {
            const chair = this.objects.find(obj => obj.pos.x === nextTile.xPos && obj.pos.y === nextTile.yPos && obj.type === 'chair');
            if (chair) {
              client.player.isSitting = true;
              client.player.zPos = chair.pos.z + (chair.sitOffset || 0);
              client.player.hRot = chair.pos.r;
              client.player.bRot = chair.pos.r;
              this.hotel.logger.debug(`Client ${client.id} is now sitting on chair ${chair.id}`);
            }
          }

          this.hotel.commandFactory.outgoing.STATUS({ client });
        }
      }
    });
  }

  movePlayer(client: Client, x: number, y: number) {
    if (!client.player) {
      this.hotel.logger.error(`Client ${client.id} does not have a player`);
      return;
    }
    if (this.heightmap[y][x] === 'X') {
      this.hotel.logger.error(`Client ${client.id} tried to move to an invalid tile`);
      return;
    }
    
    const z = this.heightmap[y][x] as number;
    if (z === undefined) {
      this.hotel.logger.error(`Client ${client.id} tried to move to an invalid tile`);
      return;
    }

    const walkPath = planPath({
      start: {
        xPos: client.player.xPos,
        yPos: client.player.yPos,
        zPos: client.player.zPos,
        hRot: client.player.hRot,
        bRot: client.player.bRot,
      },
      end: {
        xPos: x,
        yPos: y,
        zPos: z,
      },
      heightmap: this.heightmap,
      obstacles: this.objects,
    });

    /**
     * If end position is a furniture, we need to find the nearest walkable tile
     * to it.
     * 
     * We could do this check before path finding, but since the server is more
     * than powerful enough to calculate a path with an extra step, it's simpler
     * to just remove the last tile from the walk path if the end position is an
     * object, rather than adding in extra.
     * 
     * This approach has the added benefit od ensuring that the tile that the
     * player stops on is the most logically close to the object, rather than
     * just picking a random adjacent tile which may be further away from the
     * player's starting position.
     */
    if (this.objects.some(obj => obj.pos.x === x && obj.pos.y === y && obj.type === 'furniture')) {
      this.hotel.logger.debug(`Client ${client.id} tried to move onto an object, removed the last tile from the walk path to prevent it from trying to walk on the object`);
      walkPath.pop();
    }

    client.player.walkPath = walkPath;
  }

  public start() {
    this.status = 'started';
    this.server.listen(this.port, () => {
      this.hotel.logger.info(`Room ${this.id} listening on port ${this.port}`);
    });
  }

  public stop() {
    this.status = 'stopped';
    this.server.close(() => {
      this.hotel.logger.info(`Room ${this.id} stopped`);
    });
  }

  public startTimer(interval: number, callback: () => void) {
    if (this.timer) {
      this.hotel.logger.warn(`Timer for room ${this.id} is already running`);
      return;
    }

    this.timer = setInterval(() => {
      callback();
    }, interval * 1000);

    this.hotel.logger.info(`Timer for room ${this.id} started with interval ${interval} seconds`);
  }

  public stopTimer() {
    if (!this.timer) {
      this.hotel.logger.warn(`No timer is running for room ${this.id}`);
      return;
    }

    clearInterval(this.timer);
    this.timer = null;

    this.hotel.logger.info(`Timer for room ${this.id} stopped`);
  }
}
