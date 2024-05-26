import pino from 'pino';
import { application } from './app';

const logger = pino({ level: 'debug' });

const primary_server = application(logger);
const lobby_server = application(logger);

primary_server.listen(37120, () => {
  logger.info('Server listening on port 37120');
});

lobby_server.listen(37121, () => {
  logger.info('Server listening on port 37121');
});
