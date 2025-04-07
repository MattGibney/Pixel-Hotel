import { RoomDefinition } from '../room';

const X = 'X';

const lobbyData: RoomDefinition = {
  id: 'lobby_a',
  port: 37121,

  doorPos: [
    {
      x: 12,
      y: 28,
      z: 1,
    },
  ],
  heightmap: [
    [X,X,X,X,X,X,X,X,X,7,7,7,7,7,7,7,7,7,7,7,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,7,7,7,7,7,7,7,7,7,7,7,7,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,7,7,7,7,7,7,7,7,7,7,6,6,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,7,7,7,7,7,7,7,7,7,7,5,5,X,X,X,X],
    [X,X,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,3,3,X,X],
    [X,X,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,X,X],
    [X,X,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,X,X],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,X,X],
    [3,3,3,3,3,3,X,X,X,X,X,X,X,3,3,3,3,3,3,3,3,3,3,X,X],
    [3,3,3,3,3,3,X,X,X,X,X,X,X,2,2,2,2,2,2,2,2,2,2,X,X],
    [3,3,3,3,3,3,X,X,X,X,X,X,X,2,2,2,2,2,2,2,2,2,2,X,X],
    [X,X,3,3,3,3,X,X,X,X,X,X,X,2,2,2,2,2,2,2,2,2,2,X,X],
    [X,X,3,3,3,3,X,X,X,X,X,X,X,2,2,2,2,2,2,2,2,1,1,1,1],
    [X,X,3,3,3,3,X,X,X,X,X,X,X,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,X,X,X,X,X,X,X,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [X,X,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [X,X,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [X,X,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,2,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,2,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,2,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,2,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,X,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,2,2,2,X,1,1,1,1,1,1,1,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,X,X,X,1,1,X,X,X,X,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,X,X,X,1,1,X,X,X,X,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,X,X,X,1,1,X,X,X,X,X,X,X,X,X,X,X],
    [X,X,X,X,X,X,X,X,X,X,X,X,1,1,X,X,X,X,X,X,X,X,X,X,X],
  ],
  // f90 flower1 9 0 7 0
  // S110 chairf2b 11 0 7 4
  // s120 chairf2 12 0 7 4
  // t130 table1 13 0 7 2
  // S140 chairf2b 14 0 7 4
  // s150 chairf2 15 0 7 4
  // w160 watermatic 16 0 7 4
  // T92 telkka 9 2 7 2
  // f93 flower1 9 3 7 0
  // Z113 chairf2d 11 3 7 0
  // s123 chairf2 12 3 7 0
  // t133 table1 13 3 7 2
  // Z143 chairf2d 14 3 7 0
  // s153 chairf2 15 3 7 0
  // f124 flower1 12 4 3 0
  // f164 flower1 16 4 3 0
  // S07 chairf2b 0 7 3 4
  // s17 chairf2 1 7 3 4
  // Z010 chairf2d 0 10 3 0
  // s110 chairf2 1 10 3 0
  // r2112 roommatic 21 12 1 4
  // r2212 roommatic 22 12 1 4
  // r2312 roommatic 23 12 1 4
  // r2412 roommatic 24 12 1 4
  // S014 chairf2b 0 14 3 4
  // s114 chairf2 1 14 3 4
  // w1314 watermatic 13 14 1 2
  // w1215 watermatic 12 15 1 4
  // c1916 chairf1 19 16 1 4
  // C2116 table2c 21 16 1 2
  // c2316 chairf1 23 16 1 4
  // Z017 chairf2d 0 17 3 0
  // s117 chairf2 1 17 3 0
  // D2117 table2b 21 17 1 2
  // c1918 chairf1 19 18 1 0
  // d2118 table2 21 18 1 2
  // c2318 chairf1 23 18 1 0
  // S721 chairf2b 7 21 2 2
  // z722 chairf2c 7 22 2 2
  // z723 chairf2c 7 23 2 2
  // z724 chairf2c 7 24 2 2
  // s725 chairf2 7 25 2 2
  // t726 table1 7 26 2 2
  // e1026 flower2 10 26 1 2

  objects: [
    {
      one: 's110', // ID?
      sprite: 'chairf2b',
      pos: {
        x: 11,
        y: 0,
        z: 7,
      },
      rotation: '4',
    },
    {
      one: 's120',
      sprite: 'chairf2',
      pos: {
        x: 12,
        y: 0,
        z: 7,
      },
      rotation: '4',
    },
  ],
};

export default lobbyData;
