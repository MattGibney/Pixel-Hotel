import { Knex } from 'knex';
import { Logger } from 'pino';

export type UserRow = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  figure: string;
  birthday: string;
  phone_number: string;
  custom_data: string;
  has_read_agreement: boolean;
  gender: string;
  country: string;
  has_special_rights: boolean;
  badge_type: string;
  gold: number;
};

export default class UserDao {
  private database: Knex;

  constructor(database: Knex) {
    this.database = database;
  }

  async fetchByUsername(logger: Logger, username: string): Promise<UserRow | null> {
    logger.debug({ username }, 'Fetching user by username');
    const userData = await this.database('users').where({ username }).first();
    if (!userData) return null;

    return userData;
  }
}
