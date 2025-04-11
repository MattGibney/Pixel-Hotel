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

  objects: [
    {
      id: 'f90',
      sprite: 'flower1',
      pos: { x: 9, y: 0, z: 7, r: 0 },
    },
    {
      id: 's110',
      sprite: 'chairf2b',
      pos: { x: 11, y: 0, z: 7, r: 4 },
    },
    {
      id: 's120',
      sprite: 'chairf2',
      pos: { x: 12, y: 0, z: 7, r: 4 },
    },
    {
      id: 't130',
      sprite: 'table1',
      pos: { x: 13, y: 0, z: 7, r: 2 },
    },
    {
      id: 'S140',
      sprite: 'chairf2b',
      pos: { x: 14, y: 0, z: 7, r: 4 },
    },
    {
      id: 's150',
      sprite: 'chairf2',
      pos: { x: 15, y: 0, z: 7, r: 4 },
    },
    {
      id: 'w160',
      sprite: 'watermatic',
      pos: { x: 16, y: 0, z: 7, r: 4 },
    },
    {
      id: 'T92',
      sprite: 'telkka',
      pos: { x: 9, y: 2, z: 7, r: 2 },
    },
    {
      id: 'f93',
      sprite: 'flower1',
      pos: { x: 9, y: 3, z: 7, r: 0 },
    },
    {
      id: 'z113',
      sprite: 'chairf2d',
      pos: { x: 11, y: 3, z: 7, r: 0 },
    },
    {
      id: 's123',
      sprite: 'chairf2',
      pos: { x: 12, y: 3, z: 7, r: 0 },
    },
    {
      id: 't133',
      sprite: 'table1',
      pos: { x: 13, y: 3, z: 7, r: 2 },
    },
    {
      id: 'Z143',
      sprite: 'chairf2d',
      pos: { x: 14, y: 3, z: 7, r: 0 },
    },
    {
      id: 's153',
      sprite: 'chairf2',
      pos: { x: 15, y: 3, z: 7, r: 0 },
    },
    {
      id: 'f124',
      sprite: 'flower1',
      pos: { x: 12, y: 4, z: 3, r: 0 },
    },
    {
      id: 'f164',
      sprite: 'flower1',
      pos: { x: 16, y: 4, z: 3, r: 0 },
    },
    {
      id: 'S07',
      sprite: 'chairf2b',
      pos: { x: 0, y: 7, z: 3, r: 4 },
    },
    {
      id: 's17',
      sprite: 'chairf2',
      pos: { x: 1, y: 7, z: 3, r: 4 },
    },
    {
      id: 'Z010',
      sprite: 'chairf2d',
      pos: { x: 0, y: 10, z: 3, r: 0 },
    },
    {
      id: 's110',
      sprite: 'chairf2',
      pos: { x: 1, y: 10, z: 3, r: 0 },
    },
    {
      id: 'r2112',
      sprite: 'roommatic',
      pos: { x: 21, y: 12, z: 1, r: 4 },
    },
    {
      id: 'r2212',
      sprite: 'roommatic',
      pos: { x: 22, y: 12, z: 1, r: 4 },
    },
    {
      id: 'r2312',
      sprite: 'roommatic',
      pos: { x: 23, y: 12, z: 1, r: 4 },
    },
    {
      id: 'r2412',
      sprite: 'roommatic',
      pos: { x: 24, y: 12, z: 1, r: 4 },
    },
    {
      id: 's014',
      sprite: 'chairf2b',
      pos: { x: 0, y: 14, z: 3, r: 4 },
    },
    {
      id: 's114',
      sprite: 'chairf2',
      pos: { x: 1, y: 14, z: 3, r: 4 },
    },
    {
      id: 'w1314',
      sprite: 'watermatic',
      pos: { x: 13, y: 14, z: 1, r: 2 },
    },
    {
      id: 'w125',
      sprite: 'watermatic',
      pos: { x: 12, y: 15, z: 1, r: 4 },
    },
    {
      id: 'c1916',
      sprite: 'chairf1',
      pos: { x: 19, y: 16, z: 1, r: 4 },
    },
    {
      id: 'X2116',
      sprite: 'table2c',
      pos: { x: 21, y: 16, z: 1, r: 2 },
    },
    {
      id: 'c2316',
      sprite: 'chairf1',
      pos: { x: 23, y: 16, z: 1, r: 4 },
    },
    {
      id: 'Z017',
      sprite: 'chairf2d',
      pos: { x: 0, y: 17, z: 3, r: 0 },
    },
    {
      id: 's117',
      sprite: 'chairf2',
      pos: { x: 1, y: 17, z: 3, r: 0 },
    },
    {
      id: 'D2117',
      sprite: 'table2b',
      pos: { x: 21, y: 17, z: 1, r: 2 },
    },
    {
      id: 'c1918',
      sprite: 'chairf1',
      pos: { x: 19, y: 18, z: 1, r: 0 },
    },
    {
      id: 'd2118',
      sprite: 'table2',
      pos: { x: 21, y: 18, z: 1, r: 2 },
    },
    {
      id: 'c2318',
      sprite: 'chairf1',
      pos: { x: 23, y: 18, z: 1, r: 0 },
    },
    {
      id: 'S721',
      sprite: 'chairf2b',
      pos: { x: 7, y: 21, z: 2, r: 2 },
    },
    {
      id: 'z722',
      sprite: 'chairf2c',
      pos: { x: 7, y: 22, z: 2, r: 2 },
    },
    {
      id: 'z723',
      sprite: 'chairf2c',
      pos: { x: 7, y: 23, z: 2, r: 2 },
    },
    {
      id: 'z724',
      sprite: 'chairf2c',
      pos: { x: 7, y: 24, z: 2, r: 2 },
    },
    {
      id: 's725',
      sprite: 'chairf2',
      pos: { x: 7, y: 25, z: 2, r: 2 },
    },
    {
      id: 't726',
      sprite: 'table1',
      pos: { x: 7, y: 26, z: 2, r: 2 },
    },
    {
      id: 'e1026',
      sprite: 'flower2',
      pos: { x: 10, y: 26, z: 1, r: 2 },
    },
  ],
};

export default lobbyData;
