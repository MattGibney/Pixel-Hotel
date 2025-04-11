import { Server } from 'net';
import Hotel from './hotel';
import Client from './client';

export type RoomDefinition = {
  id: string;
  port: number;

  heightmap: (number | 'X')[][];
  // Public rooms often have multiple entrance tiles. By making this an array,
  // we are open to having players randomly appear on one of them.
  doorPos: { x: number; y: number; z: number; }[];
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

      this.hotel.commandFactory.outgoing.HELLO({ client });

      socket.on('end', () => {
        this.hotel.logger.debug(`Client ${client.id} disconnected from room ${this.id}`);

        this.removeClient(client);
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

    client.player.xPos = x;
    client.player.yPos = y;
    client.player.zPos = z;
    this.hotel.logger.trace(`Client ${client.id} moved to (${x}, ${y}, ${z})`);

    this.hotel.commandFactory.outgoing.STATUS({ client });
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
}
