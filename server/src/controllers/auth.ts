import { Context } from '../app';

export default {
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
   * 
   * 
   * //TODO: Implement this command.
   */
  REGISTER: async (ctx: Context, args: string[]) => {
    const rawData = args[0];

    // Split the input string by '\r' to separate each key-value pair
    const keyValuePairs = rawData.split('\r');
    
    // Map over each key-value pair, split by the first '=', and return as a tuple
    const result = keyValuePairs.map(pair => {
        const [key, ...valueParts] = pair.split('=');
        return [key, valueParts.join('=')]; // Join the value parts back together in case of additional '='
    });

    const newUserData = Object.fromEntries(result);

    const user = await ctx.modelFactory.user.create(ctx, {
      username: newUserData.name,
      password_hash: newUserData.password,
      email: newUserData.email,
      figure: newUserData.figure,
      birthday: newUserData.birthday,
      phone_number: newUserData.phonenumber,
      custom_data: newUserData.customData,
      has_read_agreement: newUserData.has_read_agreement === '1',
      gender: newUserData.sex,
      country: newUserData.country,
      badge_type: '',
      has_special_rights: false,
      gold: 10
    });
    
  },

  /**
   * //TODO: Implement this command.
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

    const heightmap = ctx.room?.heightmap.map(row => row.join('')).join('\r');
    ctx.sendMessage(`# HEIGHTMAP\r${heightmap} ##`);

    const objects = ctx.room?.objects.map(obj => obj.join('')).join('\r');
    ctx.sendMessage(`# OBJECTS WORLD 0 lobby_a\r${objects} ##`);
    // ctx.sendMessage('# ACTIVE_OBJECTS ##')
    
    const userStrings = ctx.room?.users.map(user => `${user.userName} ${user.figure} ${user.xPos} ${user.yPos} ${user.zPos} ${user.customData}`).join('\r');
    ctx.sendMessage(`# USERS\r${userStrings} ##`);

    const entryPos = { x: 12, y: 27, z: 1, rotation: { head: 0, body: 0 } };
    ctx.user.xPos = entryPos.x;
    ctx.user.yPos = entryPos.y;
    ctx.user.zPos = entryPos.z;
    ctx.user.hRot = entryPos.rotation.head;
    ctx.user.bRot = entryPos.rotation.body;
    ctx.sendMessage(`# STATUS\r${ctx.user?.serialise('STATUS')} ##`);

    ctx.room?.addUser(user);
  }
};
