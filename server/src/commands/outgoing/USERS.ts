import { Command } from '../../commandFactory';
import Player from '../../player';

export default function USERS(props: Command) {
  const { client } = props;

  const players = client.room.clients.map(c => c.player).filter(p => p !== null) as Player[];

  const userStrings = players.map(player => `${player.userName} ${player.figure} ${player.xPos} ${player.yPos} ${player.zPos} ${player.customData}`).join('\r');
  client.sendMessage(`# USERS\r${userStrings}##`);
  
  client.room.hotel.logger.debug({ cmd: `# USERS\r${userStrings} ##`}, `[${client.id}] Sending USERS message`);
}
