import { Command } from '../../commandFactory';

export default function ENCRYPTION_OFF(props: Command) {
  const { client } = props;
  
  client.sendMessage('# ENCRYPTION_OFF ##');
  client.room.hotel.logger.trace(`[${client.id}] Sending ENCRYPTION_OFF message`);
}
