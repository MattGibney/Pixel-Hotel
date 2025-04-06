import { Command } from '../../commandFactory';

/**
 * This command informs the client of the users balance of Habbo Credits.
 */
export default function GETCREDITS(props: Command) {
  const { client } = props;
  
  client.room.hotel.commandFactory.outgoing.WALLETBALANCE({ client });
}
