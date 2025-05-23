import Client from './client';

import APPROVENAME from './commands/incoming/APPROVENAME';
import CLIENTIP from './commands/incoming/CLIENTIP';
import FINDUSER from './commands/incoming/FINDUSER';
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
import REGISTER from './commands/incoming/REGISTER';
import SEARCHBUSYFLATS from './commands/incoming/SEARCHBUSYFLATS';
import STAT from './commands/incoming/STAT';
import STATUSOK from './commands/incoming/STATUSOK';
import UNIQUEMACHINEID from './commands/incoming/UNIQUEMACHINEID';
import VERSIONCHECK from './commands/incoming/VERSIONCHECK';

import ACTIVE_OBJECTS from './commands/outgoing/ACTIVE_OBJECTS';
import ALLUNITS from './commands/outgoing/ALLUNITS';
import BUDDYLIST from './commands/outgoing/BUDDYLIST';
import BUSY_FLAT_RESULTS from './commands/outgoing/BUSY_FLAT_RESULTS';
import ENCRYPTION_OFF from './commands/outgoing/ENCRYPTION_OFF';
import ERROR from './commands/outgoing/ERROR';
import HEIGHTMAP from './commands/outgoing/HEIGHTMAP';
import HELLO from './commands/outgoing/HELLO';
import NAME_APPROVED from './commands/outgoing/NAME_APPROVED';
import OBJECTS_WORLD from './commands/outgoing/OBJECTS_WORLD';
import OK from './commands/outgoing/OK';
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
    APPROVENAME,
    CLIENTIP,
    FINDUSER,
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
    REGISTER,
    SEARCHBUSYFLATS,
    STAT,
    STATUSOK,
    UNIQUEMACHINEID,
    VERSIONCHECK,
  },
  outgoing: {
    ACTIVE_OBJECTS,
    ALLUNITS,
    BUDDYLIST,
    BUSY_FLAT_RESULTS,
    ENCRYPTION_OFF,
    ERROR,
    HEIGHTMAP,
    HELLO,
    NAME_APPROVED,
    OBJECTS_WORLD,
    OK,
    SECRET_KEY,
    STATUS,
    USEROBJECT,
    USERS,
    WALLETBALANCE
  },
}
