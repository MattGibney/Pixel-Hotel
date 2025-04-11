import { RoomDefinition } from '../room';
import type { PlayerPos } from '../player';

type Tile = { x: number; y: number; z: number };
type Node = Tile & { f: number; g: number; h: number; parent?: Node };

function isWalkableTile(
  heightmap: (number | 'X')[][],
  from: Tile,
  to: Tile,
  obstacles: RoomDefinition['objects'],
  end: Tile
): boolean {
  const rows = heightmap.length;
  const cols = heightmap[0].length;

  if (to.x < 0 || to.x >= cols || to.y < 0 || to.y >= rows) return false;

  const target = heightmap[to.y][to.x];
  if (target === 'X') return false;

  const heightDiff = Math.abs((target as number) - from.z);
  if (heightDiff > 1) return false;

  const isObstacle = obstacles.some(
    (obj) => obj.pos.x === to.x && obj.pos.y === to.y && (obj.pos.x !== end.x || obj.pos.y !== end.y)
  );
  if (isObstacle) return false;

  return true;
}

function getNeighbours(
  current: Tile,
  heightmap: (number | 'X')[][],
  obstacles: RoomDefinition['objects'],
  end: Tile
): Tile[] {
  const directions = [
    { dx: 0, dy: -1 }, // up
    { dx: 1, dy: 0 },  // right
    { dx: 0, dy: 1 },  // down
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: -1 }, // up-right (diagonal)
    { dx: 1, dy: 1 },  // down-right (diagonal)
    { dx: -1, dy: 1 }, // down-left (diagonal)
    { dx: -1, dy: -1 } // up-left (diagonal)
  ];

  return directions
    .map(({ dx, dy }) => {
      const x = current.x + dx;
      const y = current.y + dy;
      const z = heightmap[y]?.[x];
      if (typeof z === 'number') {
        const tile = { x, y, z };
        return isWalkableTile(heightmap, current, tile, obstacles, end) ? tile : null;
      }
      return null;
    })
    .filter(Boolean) as Tile[];
}

function heuristic(a: Tile, b: Tile): number {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  const dz = Math.abs(a.z - b.z);

  // Use diagonal distance heuristic
  return Math.max(dx, dy) + dz;
}

function calculateRotation(from: Tile, to: Tile): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  if (dx === 1 && dy === 0) return 2; // right
  if (dx === -1 && dy === 0) return 6; // left
  if (dx === 0 && dy === 1) return 4; // down
  if (dx === 0 && dy === -1) return 0; // up

  if (dx === 1 && dy === -1) return 1; // up-right
  if (dx === 1 && dy === 1) return 3; // down-right
  if (dx === -1 && dy === 1) return 5; // down-left
  if (dx === -1 && dy === -1) return 7; // up-left

  return 0; // default
}

function astarPathfinding(
  start: Tile,
  end: Tile,
  heightmap: (number | 'X')[][],
  obstacles: RoomDefinition['objects']
): Tile[] {
  const open: Node[] = [{ ...start, f: 0, g: 0, h: 0 }];
  const closed: Set<string> = new Set();

  while (open.length > 0) {
    open.sort((a, b) => a.f - b.f);
    const current = open.shift()!;
    const key = `${current.x},${current.y}`;

    if (current.x === end.x && current.y === end.y) {
      const path: Tile[] = [];
      let n: Node | undefined = current;
      while (n) {
        path.unshift({ x: n.x, y: n.y, z: n.z });
        n = n.parent;
      }
      return path;
    }

    closed.add(key);
    const neighbours = getNeighbours(current, heightmap, obstacles, end);
    for (const n of neighbours) {
      const nKey = `${n.x},${n.y}`;
      if (closed.has(nKey)) continue;

      const g = current.g + 1;
      const h = heuristic(n, end);
      const f = g + h;

      const existing = open.find((node) => node.x === n.x && node.y === n.y);
      if (!existing || g < existing.g) {
        open.push({ ...n, g, h, f, parent: current });
      }
    }
  }

  return [];
}

function convertPathToPlayerPos(path: Tile[]): PlayerPos[] {
  const positions: PlayerPos[] = [];
  let lastRotation = 0; // Default rotation value

  for (let i = 0; i < path.length; i++) {
    const curr = path[i];
    const next = path[i + 1]; // Next tile or undefined if it's the last tile
    const rot = next ? calculateRotation(curr, next) : lastRotation; // Reuse lastRotation if next is undefined
    lastRotation = rot; // Update lastRotation for reuse
    positions.push({
      xPos: curr.x,
      yPos: curr.y,
      zPos: curr.z,
      hRot: rot,
      bRot: rot,
    });
  }
  return positions;
}

interface planPathOptions {
  start: PlayerPos;
  end: Omit<PlayerPos, 'hRot' | 'bRot'>;
  heightmap: (number | 'X')[][];
  obstacles: RoomDefinition['objects'];
};
export function planPath(props: planPathOptions): PlayerPos[] {
  const { start, end, heightmap, obstacles } = props;

  const startTile: Tile = {
    x: start.xPos,
    y: start.yPos,
    z: start.zPos,
  };

  const endTile: Tile = {
    x: end.xPos,
    y: end.yPos,
    z: end.zPos,
  };
  
  const path = astarPathfinding(startTile, endTile, heightmap, obstacles);
  return convertPathToPlayerPos(path);
}
