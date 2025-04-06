import pino from 'pino';
import express from 'express';
// import { application } from './app';
import Knex from 'knex';
import knexConfig from './knexfile';
import DaoFactory from './daoFactory';
import Room from './room';
import Hotel from './hotel';

import hotelViewData from './rooms/hotelView';
import lobbyData from './rooms/lobby';

const knex = Knex(knexConfig);
const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true, // Enable colorized logs
    },
  },
});

const daoFactory = new DaoFactory(knex);

const hotel = new Hotel(logger, daoFactory);

hotel.addRoom(hotelViewData);
hotel.addRoom(lobbyData);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/rooms', (req, res) => {
  const rooms = hotel.rooms;
  const roomList = Object.keys(rooms).map((key) => ({
    id: rooms[key].id,
    port: rooms[key].port,
    status: rooms[key].status,
    clients: rooms[key].clients.map((client) => client.player?.id),
  }));
  res.json(roomList);
});

app.listen(3000, () => {
  logger.info('Server listening on port 3000');
});

// const rooms = {
//   lobby: new Room(),
// }



// const primary_server = application(logger, daoFactory);
// const lobby_server = application(logger, daoFactory, rooms['lobby']);

// primary_server.listen(37120, () => {
//   logger.info('Server listening on port 37120');
// });

// lobby_server.listen(37121, () => {
//   logger.info('Server listening on port 37121');
// });
