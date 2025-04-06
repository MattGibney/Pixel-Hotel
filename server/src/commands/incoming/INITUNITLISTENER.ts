import { Command } from '../../commandFactory';

/**
 * This command is sent when the user first logs in. It is used to prompt the
 * server to sent a list of rooms to the client. I beleive that these are all
 * supposed to be public rooms.
 */
export default function INITUNITLISTENER(props: Command) {
  const { client, args } = props;

  client.room.hotel.commandFactory.outgoing.ALLUNITS({
    client,
  });
}
