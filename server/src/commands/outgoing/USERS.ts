import { Command } from '../../commandFactory';
import Player from '../../player';

type UsersCommand = Command & {
  players?: Player[];
};

export default function USERS(props: UsersCommand) {
  const { client } = props;

  const players = props.players || client.room.clients.map(c => c.player).filter(p => p !== null) as Player[];

  const userStrings = players.map(player => `${player.userName} ${player.figure} ${player.xPos} ${player.yPos} ${player.zPos} ${player.customData}`).join('\r');
  client.sendMessage(`# USERS\r${userStrings}##`);
  
  client.room.hotel.logger.debug({ cmd: `# USERS\r${userStrings} ##`}, `[${client.id}] Sending USERS message`);
}
