import { Command } from '../../commandFactory';

/**
 * This command provides the client witha list of all public rooms that can be
 * joined.
 * 
 * //TODO: Work out the specifics of the data structure sent to the client.
 */
export default function OBJECTS_WORLD(props: Command) {
  const { client } = props;

  const roomID = client.room.id;
  const objects = client.room.objects.map(obj => `${obj.one} ${obj.sprite} ${obj.pos.x} ${obj.pos.y} ${obj.pos.z} ${obj.rotation}`).join('\r');
  client.sendMessage(`# OBJECTS WORLD 0 ${roomID}\r${objects} ##`);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending OBJECTS WORLD message`);
}
