import Client from './client';
import CLIENTIP from './commands/incoming/CLIENTIP';
import HABBOREP from './commands/incoming/HABBOREP';
import INFORETRIEVE from './commands/incoming/INFORETRIEVE';
import KEYENCRYPTED from './commands/incoming/KEYENCRYPTED';
import STAT from './commands/incoming/STAT';
import UNIQUEMACHINEID from './commands/incoming/UNIQUEMACHINEID';
import VERSIONCHECK from './commands/incoming/VERSIONCHECK';

import ENCRYPTION_OFF from './commands/outgoing/ENCRYPTION_OFF';
import ERROR from './commands/outgoing/ERROR';
import HELLO from './commands/outgoing/HELLO';
import SECRET_KEY from './commands/outgoing/SECRET_KEY';

export interface Command {
  client: Client;
  args?: string[];
}

export default {
  incoming: {
    CLIENTIP,
    HABBOREP,
    INFORETRIEVE,
    KEYENCRYPTED,
    STAT,
    UNIQUEMACHINEID,
    VERSIONCHECK,
  },
  outgoing: {
    ENCRYPTION_OFF,
    ERROR,
    HELLO,
    SECRET_KEY
  },
}
