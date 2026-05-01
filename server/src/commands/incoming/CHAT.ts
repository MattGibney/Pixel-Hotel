import { Command } from '../../commandFactory';

/**
 * Habbos talking in rooms
 */
export default function CHAT(props: Command) {
  const { client, args } = props;

  // TODO: Message filtering?
  const message = args?.join(' ') || '';
  console.log('CHAT', message);

  client.room.chat(client, message);
}
