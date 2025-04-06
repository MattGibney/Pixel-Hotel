import { Server } from 'net';
import Hotel from './hotel';
import Client from './client';

export type RoomDefinition = {
  id: string;
  port: number;

  heightmap: (number | 'X')[][];
  objects: {
    one: string;
    sprite: string;
    pos: {
      x: number;
      y: number;
      z: number;
    };
    rotation: string;
  }[];
};

export default class Room {
  public hotel: Hotel;

  public id: RoomDefinition['id'];
  public port: RoomDefinition['port'];
  public heightmap: RoomDefinition['heightmap'];
  public objects: RoomDefinition['objects'];

  public status: 'started' | 'stopped' = 'stopped';
  public clients: Client[] = [];

  private server: Server;

  constructor(hotel: Hotel, data: RoomDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.port = data.port;
    this.heightmap = data.heightmap;
    this.objects = data.objects;

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
