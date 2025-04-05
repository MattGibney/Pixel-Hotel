import * as PF from 'pathfinding';
import UserModel from './models/user';

type Position = {
  x: number;
  y: number;
}

export default class Room {

  public users: UserModel[] = [];
  public heightmap: (number | 'X')[][] = [
    ['X','X','X','X','X','X','X','X','X',7,7,7,7,7,7,7,7,7,7,7,'X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X',7,7,7,7,7,7,7,7,7,7,7,7,'X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X',7,7,7,7,7,7,7,7,7,7,6,6,'X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X',7,7,7,7,7,7,7,7,7,7,5,5,'X','X','X','X'],
    ['X','X',3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,'X','X'],
    ['X','X',3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,'X','X'],
    ['X','X',3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,'X','X'],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,'X','X'],
    [3,3,3,3,3,3,'X','X','X','X','X','X','X',3,3,3,3,3,3,3,3,3,3,'X','X'],
    [3,3,3,3,3,3,'X','X','X','X','X','X','X',2,2,2,2,2,2,2,2,2,2,'X','X'],
    [3,3,3,3,3,3,'X','X','X','X','X','X','X',2,2,2,2,2,2,2,2,2,2,'X','X'],
    ['X','X',3,3,3,3,'X','X','X','X','X','X','X',2,2,2,2,2,2,2,2,2,2,'X','X'],
    ['X','X',3,3,3,3,'X','X','X','X','X','X','X',2,2,2,2,2,2,2,2,1,1,1,1],
    ['X','X',3,3,3,3,'X','X','X','X','X','X','X',1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,'X','X','X','X','X','X','X',1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ['X','X',3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ['X','X',3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ['X','X',3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,2,1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,2,1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,2,1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,2,1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,'X',1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X',2,2,2,'X',1,1,1,1,1,1,1,'X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X',1,1,'X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X',1,1,'X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X',1,1,'X','X','X','X','X','X','X','X','X','X','X'],
    ['X','X','X','X','X','X','X','X','X','X','X','X',1,1,'X','X','X','X','X','X','X','X','X','X','X'],
  ];
  public objects: any[] = []; //f90 flower1 9 0 7 0\rS110 chairf2b 11 0 7 4\rs120 chairf2 12 0 7 4\rt130 table1 13 0 7 2\rS140 chairf2b 14 0 7 4\rs150 chairf2 15 0 7 4\rw160 watermatic 16 0 7 4\rT92 telkka 9 2 7 2\rf93 flower1 9 3 7 0\rZ113 chairf2d 11 3 7 0\rs123 chairf2 12 3 7 0\rt133 table1 13 3 7 2\rZ143 chairf2d 14 3 7 0\rs153 chairf2 15 3 7 0\rf124 flower1 12 4 3 0\rf164 flower1 16 4 3 0\rS07 chairf2b 0 7 3 4\rs17 chairf2 1 7 3 4\rZ010 chairf2d 0 10 3 0\rs110 chairf2 1 10 3 0\rr2112 roommatic 21 12 1 4\rr2212 roommatic 22 12 1 4\rr2312 roommatic 23 12 1 4\rr2412 roommatic 24 12 1 4\rS014 chairf2b 0 14 3 4\rs114 chairf2 1 14 3 4\rw1314 watermatic 13 14 1 2\rw1215 watermatic 12 15 1 4\rc1916 chairf1 19 16 1 4\rC2116 table2c 21 16 1 2\rc2316 chairf1 23 16 1 4\rZ017 chairf2d 0 17 3 0\rs117 chairf2 1 17 3 0\rD2117 table2b 21 17 1 2\rc1918 chairf1 19 18 1 0\rd2118 table2 21 18 1 2\rc2318 chairf1 23 18 1 0\rS721 chairf2b 7 21 2 2\rz722 chairf2c 7 22 2 2\rz723 chairf2c 7 23 2 2\rz724 chairf2c 7 24 2 2\rs725 chairf2 7 25 2 2\rt726 table1 7 26 2 2\re1026 flower2 10 26 1 2
  
  private tickTimer: number | undefined;

  constructor() {
    this.startTick();
  }

  startTick() {
    this.tickTimer = setInterval(() => {
      
      // console.log('TICK');
      this.users.forEach(user => {
        if (user.navigationPath.length > 0) {
          const next = user.navigationPath.shift();
          if (next) {
            user.xPos = next[0];
            user.yPos = next[1];
          }
        }
      });

      const statusStrings = this.users.map(u => u.serialise('STATUS')).join('\r');
      this.users.forEach(u => {
        u.ctx.sendMessage(`# STATUS\r${statusStrings} ##`);
      });
    }, 600) as unknown as number;
  }

  stopTick() {
    clearInterval(this.tickTimer);
  }
  
  planNavigationRoute(user: UserModel, target: Position) {
    const matrix = this.heightmap.map(row => row.map(cell => cell === 'X' ? 1 : 0));
    
    const grid = new PF.Grid(matrix);

    const finder = new PF.AStarFinder({
      diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles
    });
    const path = finder.findPath(user.xPos, user.yPos, target.x, target.y, grid);
    
    user.navigationPath = path;
  }

  chat(user: UserModel, message: string) {
    this.users.forEach(u => u.ctx.sendMessage(`# CHAT\r${user.userName} ${message} ##`));
  }

  move(user: UserModel, x: number, y: number) {
    this.planNavigationRoute(user, { x, y });

    // const statusStrings = this.users.map(u => u.serialise('STATUS')).join('\r');
    // this.users.forEach(u => {
    //   u.ctx.sendMessage(`# STATUS\r${statusStrings} ##`);
    // });
  }

  addUser(user: UserModel) {
    this.users.push(user);

    this.users.forEach(u => {
      u.ctx.sendMessage(`# USERS\r${user.userName} ${user.figure} ${user.xPos} ${user.yPos} ${user.zPos} ${user.customData} ##`)
      u.ctx.sendMessage(`# STATUS\r${user.serialise('STATUS')} ##`);
    });
  }

  removeUser(user: UserModel) {
    this.users = this.users.filter(u => u !== user);
  }
}
