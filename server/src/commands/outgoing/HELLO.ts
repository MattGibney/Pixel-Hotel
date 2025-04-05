import { Command } from '../../commandFactory';

/**
 * When the client intiates a connection, it waits for the server to send an
 * initial message of HELLO. This emssage MUST be sent to the client before any
 * other messages are sent. Failure to do so will result in the client refusing
 * to connect.
 */
export default function HELLO(props: Command) {
  const { client } = props;

  client.sendMessage('# HELLO ##');
  
  client.room.hotel.logger.trace(`[${client.id}] Sending HELLO message`);
}
