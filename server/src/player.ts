import Hotel from './hotel';
import Room from './room';

export type PlayerDefinition = {
  id: string;
  userName: string;
};

export default class Player {
  public hotel: Hotel;

  public id: string;
  public userName: string;
  public currentRoom: Room | null = null;

  public xPos: number = 0; // x position
  public yPos: number = 0; // y position
  public zPos: number = 0; // z position
  public hRot: number = 0; // head rotation
  public bRot: number = 0; // body rotation

  constructor(hotel: Hotel, data: PlayerDefinition) {
    this.hotel = hotel;

    this.id = data.id;
    this.userName = data.userName;
  }

  // async moveToRoom(desiredRoomID: string) {
  //   // If the player is currently in a room. Leave it first.
  //   if (this.currentRoomID) {
  //     const currentRoom = this.hotel.rooms[this.currentRoomID];
  //     if (!currentRoom) {
  //       throw new Error(`Current room ${this.currentRoomID} not found`);
  //     }

  //     // Leave the current room.
  //     this.hotel.logger.debug(`Player ${this.id} leaving room ${this.currentRoomID}`);
  //     await currentRoom.playerLeave(this);
  //   }

  //   // Join the desired room.
  //   const desiredRoom = this.hotel.rooms[desiredRoomID];
  //   if (!desiredRoom) {
  //     throw new Error(`Desired room ${desiredRoomID} not found`);
  //   }
  //   this.hotel.logger.debug(`Player ${this.id} joining room ${desiredRoomID}`);
  //   await desiredRoom.playerJoin(this);
  //   this.currentRoomID = desiredRoomID;
  // }
}
