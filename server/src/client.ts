import { Socket } from 'net';
import Player from './player';
import Room from './room';
import { parseMessages } from './utils/parser';

export default class Client {
  public socket: Socket;
  public room: Room;

  public id: string;
  public player: Player | null = null;

  constructor(socket: Socket, room: Room) {
    this.id = socket.remoteAddress || 'unknown';
    this.socket = socket;
    this.room = room;

    // Handle incoming data
    this.socket.on('data', (data) => {
      this.room.hotel.logger.debug({ data: data.toString() }, `Received data from client ${this.id}`);
      const messages = parseMessages(data.toString());
      
      messages.forEach((message) => {
        this.room.hotel.logger.trace({ message }, `Received message from client ${this.id}`);
        const command = message.command as keyof typeof this.room.hotel.commandFactory.incoming;
        if (!this.room.hotel.commandFactory.incoming[command]) {
          this.room.hotel.logger.error({ command }, `Unknown command: ${command}`);
          return;
        }
        this.room.hotel.commandFactory.incoming[command]({ client: this, args: message.args });
      });
    });
  }

  public sendMessage(message: string) {
    this.socket.write(message);
    this.room.hotel.logger.debug({ message }, `Sending message to client ${this.id}`);
  }

  public closeConnection() {
    this.socket.end();
    this.room.hotel.logger.info(`Closing connection for client ${this.id}`);
  }
}
