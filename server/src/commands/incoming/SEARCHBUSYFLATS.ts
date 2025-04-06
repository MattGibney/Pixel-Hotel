import { Command } from '../../commandFactory';

export default function SEARCHBUSYFLATS(props: Command) {
  const { client, args } = props;

  client.room.hotel.commandFactory.outgoing.BUSY_FLAT_RESULTS({ client });
}
