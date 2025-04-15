import { Command } from '../../commandFactory';

export default function NAME_APPROVED(props: Command) {
  const { client } = props;

  client.sendMessage('# NAME_APPROVED ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending NAME_APPROVED message`);
}
