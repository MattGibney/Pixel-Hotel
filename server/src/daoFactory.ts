import { Knex } from 'knex';
import UserDao from './daos/user';

export default class DaoFactory {
  private database: Knex;

  public user: UserDao;

  constructor(knex: Knex) {
    this.database = knex;

    this.user = new UserDao(this.database);
  }
}