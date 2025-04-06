import { Command } from '../../commandFactory';

/**
 * This command informs the client of the users balance of Habbo Credits. It's a
 * simple number. This needs tpo be a whole number, not a float.
 * 
 * This is always sent following a GETCREDITS command. It's possible that this
 * command is sent at other times, but I haven't seen it yet.
 */
export default function WALLETBALANCE(props: Command) {
  const { client } = props;

  const credits = 0;

  client.sendMessage(`# WALLETBALANCE\r${credits} ##`);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending WALLETBALANCE message`);
}
