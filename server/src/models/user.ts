import { Context } from '../app';
import { UserRow } from '../daos/user';

export default class UserModel {
  public ctx: Context;

  public userName: string;
  public email: string;
  public figure: string;
  public birthday: string;
  public phoneNumber: string;
  public customData: string;
  public hasReadAgreement: boolean;
  public gender: string;
  public country: string;
  public hasSpecialRights: boolean;
  public badgeType: string;

  public gold: number = 0;

  public xPos: number = 0; // x position
  public yPos: number = 0; // y position
  public zPos: number = 0; // z position
  public hRot: number = 0; // head rotation
  public bRot: number = 0; // body rotation

  public navigationPath: number[][] = [];

  constructor(ctx: Context, data: UserRow) {
    this.ctx = ctx;

    this.userName = data.username;
    this.email = data.email;
    this.figure = data.figure;
    this.birthday = data.birthday;
    this.phoneNumber = data.phone_number;
    this.customData = data.custom_data;
    this.hasReadAgreement = data.has_read_agreement;
    this.gender = data.gender;
    this.country = data.country;
    this.hasSpecialRights = data.has_special_rights;
    this.badgeType = data.badge_type;

    this.gold = data.gold;
  }

  serialise(type: 'INFORETRIEVE' | 'STATUS'): string {
    if (type === 'INFORETRIEVE') {
      const data = {
        "name": this.userName,
        "email": this.email,
        "figure": this.figure,
        "birthday": this.birthday,
        "phonenumber": this.phoneNumber,
        "customData": this.customData,
        "had_read_agreement": this.hasReadAgreement ? '1' : '0',
        "sex": this.gender,
        "country": this.country,
        "has_special_rights": this.hasSpecialRights ? '1' : '0',
        "badge_type": this.badgeType,
      };

      let dataString = '';
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof typeof data];
        dataString += `${key}=${value}\r`;
      });

      return dataString;
    }

    // const statuses: { type: string }[] = [];
    let statusString = `${this.userName} ${this.xPos},${this.yPos},${this.zPos},${this.hRot},${this.bRot}/`;
    // statuses.forEach((status) => {
    //   statusString += `${status.type} 13,19,1/`;
    // });
    if (this.navigationPath.length > 0) {
      const next = this.navigationPath[0];
      statusString += `mv ${next[0]},${next[1]},1/`;
    }

    return statusString;
  }

  static async fetchByUsername(ctx: Context, username: string): Promise<UserModel | null> {
    const userData = await ctx.daoFactory.user.fetchByUsername(ctx.logger, username);
    if (!userData) return null;

    return new UserModel(ctx, userData);
  }

  static async create(ctx: Context, data: Partial<UserRow>): Promise<UserModel> {
    const userData = await ctx.daoFactory.user.create(ctx.logger, data);
    return new UserModel(ctx, userData);
  }
}
