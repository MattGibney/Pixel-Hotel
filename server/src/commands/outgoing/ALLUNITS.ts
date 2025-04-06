import { Command } from '../../commandFactory';

/**
 * This command provides the client witha list of all public rooms that can be
 * joined.
 * 
 * //TODO: Work out the specifics of the data structure sent to the client.
 */
export default function ALLUNITS(props: Command) {
  const { client } = props;

  // client.sendMessage('# ALLUNITS\rMain Lobby,0,25,192.168.1.31/192.168.1.31,37121,Main Lobby\tlobby,0,25,lobby_1\r ##');
  client.sendMessage('# ALLUNITS\r ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending ALLUNITS message`);
}
