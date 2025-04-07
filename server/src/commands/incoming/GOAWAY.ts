import { Command } from '../../commandFactory';

/**
 * //TODO: Understand what this command does and implement it.
 */
export default function GOAWAY(props: Command) {
  const { client } = props;

  client.room.hotel.logger.debug(`[${client.id}] GOAWAY command received`);

  client.closeConnection();
}
