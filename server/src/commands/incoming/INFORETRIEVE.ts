import { Command } from '../../commandFactory';

/**
 * This appears to be the login command. It's called with a username and
 * password. There is also a LOGIN command but I suspect that's for entering
 * rooms.
 * 
 * //TODO: Implement this command.
 */
export default function INFORETRIEVE(props: Command) {
  const { client, args } = props;

  // client.room.hotel.commandFactory.outgoing.ERROR({ client, args: ['login incorrect'] });

  client.room.hotel.commandFactory.outgoing.USEROBJECT({ client });

  // const username = args[0];
  // const password = args[1];

  // const user = await ctx.modelFactory.user.fetchByUsername(ctx, username);
  // if (!user) {
  //   ctx.sendMessage('# ERROR:\r login incorrect ##');
  //   return;
  // }

  // ctx.user = user;

  // TODO: Check password

  // ctx.sendMessage(`# USEROBJECT\r${user.serialise('INFORETRIEVE')} ##`);
}
