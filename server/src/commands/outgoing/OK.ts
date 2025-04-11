import { Command } from '../../commandFactory';

/**
 * //TODO: Understand what this command does
 */
export default function OK(props: Command) {
  const { client } = props;

  client.sendMessage('# OK ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending OK message`);
}
