import { Command } from '../../commandFactory';

/**
 * 
 */
export default function LOOKTO(props: Command) {
  const { client, args } = props;

  if (!client.player) {
    throw Error('No Player for LOOKTO Command to execute on.');
  }

  if (!args || args.length < 2) {
    client.room.hotel.commandFactory.outgoing.ERROR({ client, args: ['invalid arguments'] });
    return;
  }

  const x = Number(args[0]);
  const y = Number(args[1]);
  if (isNaN(x) || isNaN(y)) {
    client.room.hotel.commandFactory.outgoing.ERROR({ client, args: ['invalid coordinates'] });
    return;
  }

  // If the player is already on the tile, it's a NOOP.
  if (x === client.player.xPos && y === client.player.yPos) return;

  client.room.playerLookTo(client, x, y);

  client.room.hotel.logger.trace(args, `[${client.id}] LOOKTO command received`);
}
