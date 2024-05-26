import { Context } from '../app';

export default class UserModel {
  private ctx: Context;

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
  public badgeType: number;

  public gold: number = 0;

  public xPos: number = 0; // x position
  public yPos: number = 0; // y position
  public zPos: number = 0; // z position
  public hRot: number = 0; // head rotation
  public bRot: number = 0; // body rotation

  constructor(ctx: Context, data: any) {
    this.ctx = ctx;

    this.userName = data.userName;
    this.email = data.email;
    this.figure = data.figure;
    this.birthday = data.birthday;
    this.phoneNumber = data.phoneNumber;
    this.customData = data.customData;
    this.hasReadAgreement = data.hasReadAgreement;
    this.gender = data.gender;
    this.country = data.country;
    this.hasSpecialRights = data.hasSpecialRights;
    this.badgeType = data.badgeType;
  }

  static async fetchByUsername(ctx: Context, username: string): Promise<UserModel | null> {
    // return null;
    return new UserModel(ctx, {
      userName: 'test',
      email: 'test@test.com',
      figure: 'sd=001/0&hr=001/255,255,255&hd=002/255,204,153&ey=001/0&fc=001/255,204,153&bd=001/255,204,153&lh=001/255,204,153&rh=001/255,204,153&ch=001/232,177,55&ls=001/232,177,55&rs=001/232,177,55&lg=001/119,159,187&sh=001/175,220,223',
      birthday: '02.01.1992',
      phoneNumber: '+44',
      customData: 'Hello World!',
      hasReadAgreement: '1',
      gender: 'MALE',
      country: '',
      hasSpecialRights: '',
      badgeType: '',
    });
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
        "had_read_agreement": this.hasReadAgreement,
        "sex": this.gender,
        "country": this.country,
        "has_special_rights": this.hasSpecialRights,
        "badge_type": this.badgeType,
      };

      let dataString = '';
      Object.keys(data).forEach((key) => {
        const value = data[key as keyof typeof data];
        dataString += `${key}=${value}\r`;
      });

      return dataString;
    }

    const statuses: { type: string }[] = [
      // {
      //   type: 'sit'
      // }
    ];
    let statusString = `${this.userName} ${this.xPos},${this.yPos},${this.zPos},${this.hRot},${this.bRot}/`;
    statuses.forEach((status) => {
      statusString += `${status.type} 0/`;
    });

    return statusString;
  }
}
