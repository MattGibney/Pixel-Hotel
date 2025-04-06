import { Command } from '../../commandFactory';

/**
 * //TODO: Understand what this command does and implement it.
 */
export default function MESSENGERINIT(props: Command) {
  const { client } = props;

  client.room.hotel.commandFactory.outgoing.BUDDYLIST({ client });
}
