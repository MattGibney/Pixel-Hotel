import { Command } from '../../commandFactory';

/**
 * //TODO: Understand what this command does
 */
export default function STATUSOK(props: Command) {
  const { client } = props;

  client.room.hotel.commandFactory.outgoing.OK({ client });
}
