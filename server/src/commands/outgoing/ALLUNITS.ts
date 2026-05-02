import { Command } from '../../commandFactory';

/**
 * This command provides the client with a list of all public rooms that can be
 * joined.
 */
export default function ALLUNITS(props: Command) {
  const { client } = props;

  if(!client.player) return;

  const serverIP = '192.168.1.87';
  const roomsData = Object
    .values(client.player.hotel.rooms)
    .filter(room => room.id !== 'hotelView');

  const roomList = roomsData.map(room => {
    return `${room.name},${room.usersNow},${room.usersMax},${serverIP}/${serverIP},${room.port},${room.name}\t${room.cct},${room.usersNow},${room.usersMax},${room.id}`;
  }).join('\r');
  const response = `# ALLUNITS\r${roomList}\r ##`;
  client.sendMessage(response);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending ALLUNITS message`);
}
