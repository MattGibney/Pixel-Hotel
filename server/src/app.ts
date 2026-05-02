import { Logger } from 'pino';
import ModelFactory from './modelFactory';
import DaoFactory from './daoFactory';
import UserModel from './models/user';
import Room from './room';

export interface Context {
  logger: Logger;
  sendMessage: (message: string) => void;
  closeConnection: () => void;
  modelFactory: ModelFactory;
  daoFactory: DaoFactory;
  room?: Room;
  user?: UserModel;
}
