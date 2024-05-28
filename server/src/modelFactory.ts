import UserModel from './models/user';

export default class ModelFactory {
  public user: typeof UserModel;

  constructor() {
    this.user = UserModel;
  }
}