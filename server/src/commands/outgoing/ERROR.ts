import { Command } from '../../commandFactory';

export default function ERROR(props: Command) {
  const { client, args } = props;
  
  client.sendMessage(`# ERROR:\r${args?.join('\r ')} ##`);
  client.room.hotel.logger.trace(`[${client.id}] Sending ERROR message`);
}
