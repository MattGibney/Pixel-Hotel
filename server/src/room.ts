import { Server } from 'net';
import Hotel from './hotel';
import Client from './client';
import { planPath } from './utils/plotPath';
import { PlayerPos } from './player';

export type RoomDefinition = {
  id: string;
  port: number;

  heightmap: (number | 'X')[][];
  // Public rooms often have multiple entrance tiles. By making this an array,
  // we are open to having players randomly appear on one of them.
  doorPos: PlayerPos[];
  objects: {
    id: string;
    sprite: string;
    pos: {
      x: number;
      y: number;
      z: number;
      r: number;
    };
  }[];
};

export default class Room {
  public hotel: Hotel;

  public id: RoomDefinition['id'];
  public port: RoomDefinition['port'];
  public heightmap: RoomDefinition['heightmap'];
  public objects: RoomDefinition['objects'];
  public doorPos: RoomDefinition['doorPos'];

  public status: 'started' | 'stopped' = 'stopped';
  public clients: Client[] = [];

  private server: Server;
  private timer: NodeJS.Timeout | null = null;

  constructor(hotel: Hotel, data: RoomDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.port = data.port;
    this.heightmap = data.heightmap;
    this.objects = data.objects;
    this.doorPos = data.doorPos;

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

  addClient(client: Client) {
    this.clients.push(client);
    this.hotel.logger.debug(`Client ${client.id} added to room ${this.id}`);
  }

  removeClient(client: Client) {
    this.clients = this.clients.filter((c) => c !== client);
    this.hotel.logger.debug(`Client ${client.id} removed from room ${this.id}`);
  }

  executeTick() {
    // for each client, if the player object has a walkPath, move the player
    this.clients.forEach((client) => {
      if (client.player && client.player.walkPath.length > 0) {
        const nextTile = client.player.walkPath.shift();
        if (nextTile) {
          client.player.xPos = nextTile.xPos;
          client.player.yPos = nextTile.yPos;
          client.player.zPos = nextTile.zPos;
          client.player.hRot = nextTile.hRot;
          client.player.bRot = nextTile.bRot;

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
