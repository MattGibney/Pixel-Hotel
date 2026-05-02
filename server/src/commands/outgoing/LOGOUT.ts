import { Command } from '../../commandFactory';
import Player from '../../player';

type LogoutCommand = Command & {
  player: Player;
};

export default function LOGOUT(props: LogoutCommand) {
  const { client, player } = props;

  client.sendMessage(`# LOGOUT\r${player.userName} ##`);

  client.room.hotel.logger.debug({ cmd: `# LOGOUT\r${player.userName} ##` }, `[${client.id}] Sending LOGOUT message`);
}
