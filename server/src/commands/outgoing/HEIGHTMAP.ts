import { Command } from '../../commandFactory';

export default function HEIGHTMAP(props: Command) {
  const { client } = props;

  const heightmap = client.room.heightmap.map(row => row.join('')).join('\r');
  client.sendMessage(`# HEIGHTMAP\r${heightmap} ##`);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending HEIGHTMAP message`);
}
