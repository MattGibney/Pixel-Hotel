import { Command } from '../../commandFactory';

/**
 * //TODO: Understand the purpose of this command.
 */
export default function ACTIVE_OBJECTS(props: Command) {
  const { client } = props;

  client.sendMessage('# ACTIVE_OBJECTS ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending ACTIVE_OBJECTS message`);
}
