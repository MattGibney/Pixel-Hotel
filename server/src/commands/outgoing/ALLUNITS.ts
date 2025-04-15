import { Command } from '../../commandFactory';

/**
 * This command provides the client witha list of all public rooms that can be
 * joined.
 * 
 * //TODO: Work out the specifics of the data structure sent to the client.
 */
export default function ALLUNITS(props: Command) {
  const { client } = props;

  const serverIP = '192.168.1.31';
  const roomsData = [
    {
      name: 'Main Lobby',
      usersNow: 0,
      usersMax: 25,
      serverPort: 37121,
      cct: 'lobby',
      modelName: 'lobby_a',
    }
  ];

  const roomList = roomsData.map(room => {
    return `${room.name},${room.usersNow},${room.usersMax},${serverIP}/${serverIP},${room.serverPort},${room.name}\t${room.cct},${room.usersNow},${room.usersMax},${room.modelName}`;
  }).join('\r');
  const response = `# ALLUNITS\r${roomList}\r ##`;
  client.sendMessage(response);
  
  client.room.hotel.logger.trace(`[${client.id}] Sending ALLUNITS message`);
}
