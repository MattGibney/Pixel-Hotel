import { Server } from 'net';
import Hotel from './hotel';
import Client from './client';

export type RoomDefinition = {
  id: string;
  port: number;

  heightmap: (number | 'X')[][];
};

export default class Room {
  public hotel: Hotel;

  public id: RoomDefinition['id'];
  public port: RoomDefinition['port'];
  public heightmap: RoomDefinition['heightmap'];

  public status: 'started' | 'stopped' = 'stopped';
  public clients: Client[] = [];

  private server: Server;

  constructor(hotel: Hotel, data: RoomDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.port = data.port;
    this.heightmap = data.heightmap;

    this.server = new Server((socket) => {
      const client = new Client(socket, this);
      this.clients.push(client);

      this.hotel.commandFactory.outgoing.HELLO({ client });

      socket.on('end', () => {
        console.log('Client disconnected');
        this.clients = this.clients.filter((c) => c !== client);
      });
    });
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
