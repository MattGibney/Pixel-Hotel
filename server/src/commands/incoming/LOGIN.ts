import { Command } from '../../commandFactory';
import Player from '../../player';

/**
 * This command is sent when the user joins a new server (room). The client
 * expects to receive a heightmap and list of objects in the room. If these
 * aren't sent, the room is not rendered.
 *
 * //TODO: Understand what this command does and implement it.
 */
export default function LOGIN(props: Command) {
  const { client } = props;

  client.room.hotel.logger.debug(`[${client.id}] LOGIN command received`);

  const player = new Player(client.room.hotel, { id: '1', userName: 'test' });
  client.player = player;

  const doorPos = client.room.doorPos[Math.floor(Math.random() * client.room.doorPos.length)];
  // This code is also used for the hotel view which doesn't have a door
  if (doorPos) {
    client.player.xPos = doorPos.x;
    client.player.yPos = doorPos.y;
    client.player.zPos = doorPos.z;
  }

  client.room.hotel.commandFactory.outgoing.HEIGHTMAP({ client });
  client.room.hotel.commandFactory.outgoing.OBJECTS_WORLD({ client });
  client.room.hotel.commandFactory.outgoing.USERS({ client });
}
