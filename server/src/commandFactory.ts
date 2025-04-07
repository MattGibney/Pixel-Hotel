import Client from './client';

import CLIENTIP from './commands/incoming/CLIENTIP';
import GETADFORME from './commands/incoming/GETADFORME';
import GETCREDITS from './commands/incoming/GETCREDITS';
import GOAWAY from './commands/incoming/GOAWAY';
import HABBOREP from './commands/incoming/HABBOREP';
import INFORETRIEVE from './commands/incoming/INFORETRIEVE';
import INITUNITLISTENER from './commands/incoming/INITUNITLISTENER';
import KEYENCRYPTED from './commands/incoming/KEYENCRYPTED';
import LOGIN from './commands/incoming/LOGIN';
import MESSENGERINIT from './commands/incoming/MESSENGERINIT';
import Move from './commands/incoming/Move';
import SEARCHBUSYFLATS from './commands/incoming/SEARCHBUSYFLATS';
import STAT from './commands/incoming/STAT';
import UNIQUEMACHINEID from './commands/incoming/UNIQUEMACHINEID';
import VERSIONCHECK from './commands/incoming/VERSIONCHECK';

import ALLUNITS from './commands/outgoing/ALLUNITS';
import BUDDYLIST from './commands/outgoing/BUDDYLIST';
import BUSY_FLAT_RESULTS from './commands/outgoing/BUSY_FLAT_RESULTS';
import ENCRYPTION_OFF from './commands/outgoing/ENCRYPTION_OFF';
import ERROR from './commands/outgoing/ERROR';
import HEIGHTMAP from './commands/outgoing/HEIGHTMAP';
import HELLO from './commands/outgoing/HELLO';
import OBJECTS_WORLD from './commands/outgoing/OBJECTS_WORLD';
import SECRET_KEY from './commands/outgoing/SECRET_KEY';
import STATUS from './commands/outgoing/STATUS';
import USEROBJECT from './commands/outgoing/USEROBJECT';
import USERS from './commands/outgoing/USERS';
import WALLETBALANCE from './commands/outgoing/WALLETBALANCE';

export interface Command {
  client: Client;
  args?: string[];
}

export default {
  incoming: {
    CLIENTIP,
    GETADFORME,
    GETCREDITS,
    GOAWAY,
    HABBOREP,
    INFORETRIEVE,
    INITUNITLISTENER,
    KEYENCRYPTED,
    LOGIN,
    MESSENGERINIT,
    Move,
    SEARCHBUSYFLATS,
    STAT,
    UNIQUEMACHINEID,
    VERSIONCHECK,
  },
  outgoing: {
    ALLUNITS,
    BUDDYLIST,
    BUSY_FLAT_RESULTS,
    ENCRYPTION_OFF,
    ERROR,
    HEIGHTMAP,
    HELLO,
    OBJECTS_WORLD,
    SECRET_KEY,
    STATUS,
    USEROBJECT,
    USERS,
    WALLETBALANCE
  },
}
