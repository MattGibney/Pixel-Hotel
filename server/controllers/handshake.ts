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
   * This is used to approve a name for a character. It's called when the user
   * is creating a new character. If there is no issue with the name, the server
   * does nto respond. If there is an issue, the server responds with a message
   * indicating the issue.
   * 
   * It's a NOOP for now as we'll allow ALL usernames.
   */
  APPROVENAME: (ctx: Context, args: string[]) => {

    // If the name is approved, the server responds with this message.
    ctx.sendMessage('# NAME_APPROVED ##');

    // If the name exists, the server responds with this message.
    // ctx.sendMessage('# ERROR\rUser exists ##');

    // If the name is not appropriate, the server responds with this message.
    // It doesn't matter what the issue is, it is only possible to say that the
    // name is inappropriate.
    // ctx.sendMessage('# NAME ##');
  },

  /**
   * @todo Implement this command.
   */
  REGISTER: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('REGISTER', args);
    
  },

  /**
   * @todo Implement this command.
   */
  LOGIN: async (ctx: Context, args: string[]) => {
    const username = args[0];
    // const password = args[1];

    const user = await ctx.modelFactory.user.fetchByUsername(ctx, username);
    if (!user) {
      ctx.sendMessage('# ERROR:\r login incorrect ##');
      return;
    }

    ctx.user = user;

    // console.log('LOGIN', args);

    ctx.sendMessage('# HEIGHTMAP\rXXXXXXXXX77777777777XXXXX\rXXXXXXXXX777777777777XXXX\rXXXXXXXXX777777777766XXXX\rXXXXXXXXX777777777755XXXX\rXX333333333333333334433XX\rXX333333333333333333333XX\rXX333333333333333333333XX\r33333333333333333333333XX\r333333XXXXXXX3333333333XX\r333333XXXXXXX2222222222XX\r333333XXXXXXX2222222222XX\rXX3333XXXXXXX2222222222XX\rXX3333XXXXXXX222222221111\rXX3333XXXXXXX111111111111\r333333XXXXXXX111111111111\r3333333222211111111111111\r3333333222211111111111111\r3333333222211111111111111\rXX33333222211111111111111\rXX33333222211111111111111\rXX3333322221111111XXXXXXX\rXXXXXXX22221111111XXXXXXX\rXXXXXXX22221111111XXXXXXX\rXXXXXXX22221111111XXXXXXX\rXXXXXXX22221111111XXXXXXX\rXXXXXXX222X1111111XXXXXXX\rXXXXXXX222X1111111XXXXXXX\rXXXXXXXXXXXX11XXXXXXXXXXX\rXXXXXXXXXXXX11XXXXXXXXXXX\rXXXXXXXXXXXX11XXXXXXXXXXX\rXXXXXXXXXXXX11XXXXXXXXXXX ##');
    ctx.sendMessage('# OBJECTS WORLD 0 lobby_a\rf90 flower1 9 0 7 0\rS110 chairf2b 11 0 7 4\rs120 chairf2 12 0 7 4\rt130 table1 13 0 7 2\rS140 chairf2b 14 0 7 4\rs150 chairf2 15 0 7 4\rw160 watermatic 16 0 7 4\rT92 telkka 9 2 7 2\rf93 flower1 9 3 7 0\rZ113 chairf2d 11 3 7 0\rs123 chairf2 12 3 7 0\rt133 table1 13 3 7 2\rZ143 chairf2d 14 3 7 0\rs153 chairf2 15 3 7 0\rf124 flower1 12 4 3 0\rf164 flower1 16 4 3 0\rS07 chairf2b 0 7 3 4\rs17 chairf2 1 7 3 4\rZ010 chairf2d 0 10 3 0\rs110 chairf2 1 10 3 0\rr2112 roommatic 21 12 1 4\rr2212 roommatic 22 12 1 4\rr2312 roommatic 23 12 1 4\rr2412 roommatic 24 12 1 4\rS014 chairf2b 0 14 3 4\rs114 chairf2 1 14 3 4\rw1314 watermatic 13 14 1 2\rw1215 watermatic 12 15 1 4\rc1916 chairf1 19 16 1 4\rC2116 table2c 21 16 1 2\rc2316 chairf1 23 16 1 4\rZ017 chairf2d 0 17 3 0\rs117 chairf2 1 17 3 0\rD2117 table2b 21 17 1 2\rc1918 chairf1 19 18 1 0\rd2118 table2 21 18 1 2\rc2318 chairf1 23 18 1 0\rS721 chairf2b 7 21 2 2\rz722 chairf2c 7 22 2 2\rz723 chairf2c 7 23 2 2\rz724 chairf2c 7 24 2 2\rs725 chairf2 7 25 2 2\rt726 table1 7 26 2 2\re1026 flower2 10 26 1 2\r##');
    ctx.sendMessage('# ACTIVE_OBJECTS ##')
    ctx.sendMessage(`# USERS\r${user.userName} ${user.figure} ${user.xPos} ${user.yPos} ${user.zPos} ${user.customData} ##`);

    const entryPos = { x: 12, y: 27, z: 1, rotation: { head: 0, body: 0 } };
    ctx.user.xPos = entryPos.x;
    ctx.user.yPos = entryPos.y;
    ctx.user.zPos = entryPos.z;
    ctx.user.hRot = entryPos.rotation.head;
    ctx.user.bRot = entryPos.rotation.body;
    ctx.sendMessage(`# STATUS\r${ctx.user?.serialise('STATUS')} ##`);
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
    ctx.user.xPos = parseInt(args[0]);
    ctx.user.yPos = parseInt(args[1]);

    ctx.sendMessage(`# STATUS\r${ctx.user?.serialise('STATUS')} ##`);
  },

  CHAT: (ctx: Context, args: string[]) => {
    const message = args.join(' ');
    console.log('CHAT', message);
    if (!ctx.user) return;
    ctx.sendMessage(`# CHAT\r${ctx.user.userName} ${message} ##`);
  },

  HABBOREP: (ctx: Context, args: string[]) => {
    // NOOP
    console.log('HABBOREP', args);
  },
}