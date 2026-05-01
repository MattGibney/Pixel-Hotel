import { Command } from '../../commandFactory';

/**
 * Normal chat message to room
 */
export default function SAY(
  client: Command['client'],
  { speaker, message }: { speaker: string, message: string }
) {
  client.sendMessage(`# CHAT\r${speaker} ${message} ##`);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending CHAT message`);
}
