import { Command } from '../../commandFactory';

/**
 * //TODO: Work out the specifics of the data structure sent to the client.
 */
export default function BUDDYLIST(props: Command) {
  const { client } = props;

  client.sendMessage('# BUDDYLIST ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending BUDDYLIST message`);
}
