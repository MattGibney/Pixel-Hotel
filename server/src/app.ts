import * as net from 'net';
import { Logger } from 'pino';
import ModelFactory from './modelFactory';
import DaoFactory from './daoFactory';
import UserModel from './models/user';
import { parseMessages } from './utils/parser';
import Room from './room';

import AuthController from './controllers/auth';
import HandshakeController from './controllers/handshake';

export interface Context {
  logger: Logger;
  sendMessage: (message: string) => void;
  closeConnection: () => void;
  modelFactory: ModelFactory;
  daoFactory: DaoFactory;
  room?: Room;
  user?: UserModel;
}

const commandRouter = {
  VERSIONCHECK: HandshakeController.VERSIONCHECK,
  KEYENCRYPTED: HandshakeController.KEYENCRYPTED,
  CLIENTIP: HandshakeController.CLIENTIP,
  FINDUSER: HandshakeController.FINDUSER,
  APPROVENAME: AuthController.APPROVENAME,
  REGISTER: AuthController.REGISTER,
  LOGIN: AuthController.LOGIN,
  MESSENGERINIT: HandshakeController.MESSENGERINIT,
  UNIQUEMACHINEID: HandshakeController.UNIQUEMACHINEID,
  STAT: HandshakeController.STAT,
  INFORETRIEVE: HandshakeController.INFORETRIEVE,
  GETADFORME: HandshakeController.GETADFORME,
  INITUNITLISTENER: HandshakeController.INITUNITLISTENER,
  SEARCHBUSYFLATS: HandshakeController.SEARCHBUSYFLATS,
  GETCREDITS: HandshakeController.GETCREDITS,
  STATUSOK: HandshakeController.STATUSOK,
  GOAWAY: HandshakeController.GOAWAY,
  Move: HandshakeController.MOVE,
  CHAT: HandshakeController.CHAT,
};

export const application = (logger: Logger, daoFactory: DaoFactory, room?: Room) => {
  const server = net.createServer((socket) => {
    logger.info({ remote: socket.remoteAddress }, 'Client connected.');

    const context: Context = {
      logger,
      sendMessage: (message) => {
        logger.debug({ message }, 'Sending message:');
        socket.write(message);
      },
      closeConnection: () => {
        socket.end();
      },
      modelFactory: new ModelFactory(),
      daoFactory,
      room,
    };

    /**
     * When the client intiates a connection, it waits for the server to send an
     * initial message of HELLO.
     */
    HandshakeController.HELLO(context);

    // Handle incoming data
    socket.on('data', (data) => {
      const messages = parseMessages(data.toString());

      messages.forEach((message) => {
        const cmd = message.command as keyof typeof commandRouter;

        if (!commandRouter[cmd]) {
          logger.error(cmd, 'Unknown command:');
          return;
        }

        logger.debug(cmd, 'Controller:');
        commandRouter[cmd](context, message.args);
      });
    });

    socket.on('end', () => {
      const user = context.user;
      if (user) {
        context.room?.removeUser(user);
      }
      logger.info('Client disconnected.');
    });
  });

  return server;
};
