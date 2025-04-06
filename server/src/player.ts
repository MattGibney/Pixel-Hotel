import Hotel from './hotel';

export type PlayerDefinition = {
  id: string;
  userName: string;
};

export default class Player {
  public hotel: Hotel;

  public id: string;
  public userName: string;

  public xPos: number = 0; // x position
  public yPos: number = 0; // y position
  public zPos: number = 0; // z position
  public hRot: number = 0; // head rotation
  public bRot: number = 0; // body rotation

  public figure: string = 'sd=001/0&hr=001/255,255,255&hd=002/255,204,153&ey=001/0&fc=001/255,204,153&bd=001/255,204,153&lh=001/255,204,153&rh=001/255,204,153&ch=001/232,177,55&ls=001/232,177,55&rs=001/232,177,55&lg=001/119,159,187&sh=001/175,220,223s';
  public customData: string = '';

  constructor(hotel: Hotel, data: PlayerDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.userName = data.userName;
  }
}
