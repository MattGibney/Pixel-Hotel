import { Command } from '../../commandFactory';

export default function VERSIONCHECK(props: Command) {
  const { client, args } = props;

  client.room.hotel.commandFactory.outgoing.ENCRYPTION_OFF({ client });
  client.room.hotel.commandFactory.outgoing.SECRET_KEY({ client });
}
