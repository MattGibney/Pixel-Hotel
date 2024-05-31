import { Context } from '../app';

export default {
  /**
   * When the client intiates a connection, it waits for the server to send an
   * initial message of HELLO.
   */
  HELLO: (ctx: Context) => {
    ctx.sendMessage('# HELLO ##');
  },

  /**
   * When the client sends a VERSIONCHECK command, the server responds with an
   * ENCRYPTION_OFF message and a SECRET_KEY message.
   * 
   * It's possible to send enable encryption too but presently, we're not.
   */
  VERSIONCHECK: (ctx: Context, args: string[]) => {
    ctx.sendMessage('# ENCRYPTION_OFF ##');
    ctx.sendMessage('# SECRET_KEY\r1337 ##');
  },

  /**
   * This is related to the use of encrypted traffic. We're not using it at the
   * moment. So this is a NOOP.
   */
  KEYENCRYPTED: (ctx: Context, args: string[]) => {
    // NOOP
  },

  /**
   * Example args: [ 'MacromediaSecretIPAddressCookie:', 'bd8e53e42066987ac842e9f9592e' ]
   * @todo Understand what this command does and implement it.
   */
  CLIENTIP: (ctx: Context, args: string[]) => {
    // NOOP
  },

  /**
   * This serves at least two functions. It's called at account signup,
   * presumably as a check to see if the account already exists. It's also used
   * for player searching within the game.
   * 
   * At the moment, i'm only working on registration and login, so NOOP for now.
   */
  FINDUSER: (ctx: Context, args: string[]) => {
    // NOOP
  },

  /**
   * @todo Implement this command.
   */
  MESSENGERINIT: (ctx: Context, args: string[]) => {
    ctx.sendMessage('# BUDDYLIST ##');

    // // NOOP
    // console.log('MESSENGERINIT', args);
  },

  /**
   * @todo Implement this command.
   */
  UNIQUEMACHINEID: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('UNIQUEMACHINEID', args);
  },

  /**
   * @todo Implement this command.
   */
  STAT: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('STAT', args);
  },

  /**
   * This appears to be the login command. It's called with a username and
   * password. There is also a LOGIN command but I suspect that's for entering
   * rooms.
   * 
   * @todo Implement this command.
   */
  INFORETRIEVE: async (ctx: Context, args: string[]) => {
    const username = args[0];
    const password = args[1];

    const user = await ctx.modelFactory.user.fetchByUsername(ctx, username);
    if (!user) {
      ctx.sendMessage('# ERROR:\r login incorrect ##');
      return;
    }

    ctx.user = user;

    // TODO: Check password

    ctx.sendMessage(`# USEROBJECT\r${user.serialise('INFORETRIEVE')} ##`);
  },

  /**
   * @todo Implement this command.
   */
  GETADFORME: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('GETADFORME', args);
  },

  /**
   * List public rooms.
   * @todo Implement this command.
   */
  INITUNITLISTENER: (ctx: Context, args: string[]) => {
    // console.log('INITUNITLISTENER', args);
    ctx.sendMessage('# ALLUNITS\rMain Lobby,0,25,127.0.0.1/127.0.0.1,37121,Main Lobby\tlobby,0,25,lobby_1\r ##');
  },

  /**
   * @todo Implement this command.
   */
  SEARCHBUSYFLATS: (ctx: Context, args: string[]) => {
    // console.log('SEARCHBUSYFLATS', args);

    ctx.sendMessage('# BUSY_FLAT_RESULTS 1 ##');
  },
  
  /**
   * @todo Implement this command.
   */
  GETCREDITS: (ctx: Context, args: string[]) => {
    if (!ctx.user) return;

    ctx.sendMessage(`# WALLETBALANCE\r${ctx.user.gold} ##`);
    ctx.sendMessage('# MESSENGERSMSACCOUNT\rnoaccount ##');
    ctx.sendMessage('# MESSENGERREADY ##');
  },

  STATUSOK: (ctx: Context, args: string[]) => {
    ctx.sendMessage('# OK ##');
  },

  /**
   * This is called when the user leaves a room. It tells the client their new
   * status. (Not sure what the numbers mean yet.)
   * 
   * Finally, the connection is closed. This does not log the user out, they can
   * select a new room and will re-authenticate at that time. This approach is
   * taken to allow for rooms to be hosted accross multiple servers.
   */
  GOAWAY: (ctx: Context, args: string[]) => {
    ctx.sendMessage(`# STATUS\r${ctx.user?.userName} 0,0,99,2,2/mod 0/ ##`);

    ctx.closeConnection();
  },

  MOVE: (ctx: Context, args: string[]) => {
    if (!ctx.user) return;
    
    const x = parseInt(args[0]);
    const y = parseInt(args[1]);
    ctx.room?.move(ctx.user, x, y);
  },

  CHAT: (ctx: Context, args: string[]) => {
    const message = args.join(' ');
    console.log('CHAT', message);
    if (!ctx.user) return;
    ctx.room?.chat(ctx.user, message);
    // ctx.sendMessage(`# CHAT\r${ctx.user.userName} ${message} ##`);
  },

  HABBOREP: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('HABBOREP', args);
  },
}