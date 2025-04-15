import { Command } from '../../commandFactory';
import Player from '../../player';

export default function STATUS(props: Command) {
  const { client } = props;

  const player = client.player;
  if (!player) {
    client.room.hotel.logger.error('Player not found in STATUS command');
    return;
  }

  let statusString = `${player.userName} ${player.xPos},${player.yPos},${player.zPos},${player.hRot},${player.bRot}/`;

  const isWalking = player.walkPath.length > 0;
  if (isWalking && player.walkPath[0]) {
    statusString += `mv ${player.walkPath[0].xPos},${player.walkPath[0].yPos},${player.walkPath[0].zPos}/`;
  }

  client.sendMessage(`#STATUS \r${statusString}##`);
}
