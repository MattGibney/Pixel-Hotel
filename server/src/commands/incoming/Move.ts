import { Command } from '../../commandFactory';

/**
 * //TODO: Understand what this command does and implement it.
 */
export default function Move(props: Command) {
  const { client, args } = props;

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

  client.room.movePlayer(client, x, y);

  client.room.hotel.logger.trace(args, `[${client.id}] MOVE command received`);
}
