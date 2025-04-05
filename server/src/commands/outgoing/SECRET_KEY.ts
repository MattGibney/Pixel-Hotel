import { Command } from '../../commandFactory';

export default function SECRET_KEY(props: Command) {
  const { client } = props;
  
  client.sendMessage('# SECRET_KEY\r1337 ##');
  client.room.hotel.logger.trace(`[${client.id}] Sending SECRET_KEY message`);
}
