import { Command } from '../../commandFactory';

/**
 * // TODO: Work out what this is
 */
export default function BUSY_FLAT_RESULTS(props: Command) {
  const { client } = props;

  client.sendMessage('# BUSY_FLAT_RESULTS 1 ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending BUSY_FLAT_RESULTS message`);
}
