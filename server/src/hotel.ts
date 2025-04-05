import { Logger } from 'pino';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';
import Room, { RoomDefinition } from './room';
import Player from './player';
import commandFactory from './commandFactory';

export default class Hotel {
  public logger: Logger;
  public daoFactory: DaoFactory;
  public modelFactory: ModelFactory;
  public commandFactory = commandFactory;
  
  public rooms: { [id: string]: Room } = {};
  public players: { [id: string]: Player } = {};

  constructor(logger: Logger, daoFactory: DaoFactory) {
    this.logger = logger;
    this.daoFactory = daoFactory;
    this.modelFactory = new ModelFactory();
  }

  addRoom(data: RoomDefinition) {
    const room = new Room(this, data);
    this.rooms[room.id] = room;

    room.start();
  }
}
