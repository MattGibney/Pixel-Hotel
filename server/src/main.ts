import pino from 'pino';
import { application } from './app';
import Knex from 'knex';
import knexConfig from './knexfile';
import DaoFactory from './daoFactory';
import Room from './room';

const knex = Knex(knexConfig);
const logger = pino({ level: 'debug' });

const rooms = {
  lobby: new Room(),
}

const daoFactory = new DaoFactory(knex);

const primary_server = application(logger, daoFactory);
const lobby_server = application(logger, daoFactory, rooms['lobby']);

primary_server.listen(37120, () => {
  logger.info('Server listening on port 37120');
});

lobby_server.listen(37121, () => {
  logger.info('Server listening on port 37121');
});
