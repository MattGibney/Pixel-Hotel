type Point = { x: number, y: number };
type PointNode = Point & { g: number, h: number, f: number, parent?: PointNode };

class AStar {
  private heightmap: (number | 'X')[][];
  private openList: PointNode[];
  private closedList: Set<string>;

  constructor(heightmap: (number | 'X')[][]) {
    this.heightmap = heightmap;
    this.openList = [];
    this.closedList = new Set();
  }

  private isValid(point: Point): boolean {
    const { x, y } = point;
    return x >= 0 && y >= 0 && y < this.heightmap.length && x < this.heightmap[0].length;
  }

  private isWalkable(point: Point, currentElevation: number): boolean {
    if (!this.isValid(point)) return false;
    const elevation = this.heightmap[point.y][point.x];
    return elevation !== 'X' && Math.abs((elevation as number) - currentElevation) <= 1;
  }

  private heuristic(a: Point, b: Point): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private getNeighbors(node: PointNode): PointNode[] {
    const directions: Point[] = [
      { x: 0, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }
    ];
    const neighbors: PointNode[] = [];

    for (const dir of directions) {
      const neighbor = { x: node.x + dir.x, y: node.y + dir.y };
      if (this.isValid(neighbor) && this.isWalkable(neighbor, this.heightmap[node.y][node.x] as number)) {
        neighbors.push({ ...neighbor, g: 0, h: 0, f: 0, parent: node });
      }
    }

    return neighbors.map(p => ({ ...p, g: 0, h: 0, f: 0, parent: node }));
  }

  private nodeKey(point: Point): string {
    return `${point.x},${point.y}`;
  }

  private reconstructPath(node: PointNode): Point[] {
    const path: Point[] = [];
    let current: PointNode | undefined = node;
    while (current) {
      path.unshift({ x: current.x, y: current.y });
      current = current.parent;
    }
    return path;
  }

  public findPath(start: Point, end: Point): Point[] | null {
    this.openList = [{ ...start, g: 0, h: this.heuristic(start, end), f: this.heuristic(start, end) }];
    this.closedList.clear();

    while (this.openList.length > 0) {
      // Get node with lowest f value
      this.openList.sort((a, b) => a.f - b.f);
      const currentNode = this.openList.shift()!;
      this.closedList.add(this.nodeKey(currentNode));

      // Check if we have reached the end
      if (currentNode.x === end.x && currentNode.y === end.y) {
        return this.reconstructPath(currentNode);
      }

      // Get neighbors
      const neighbors = this.getNeighbors(currentNode);
      for (const neighbor of neighbors) {
        if (this.closedList.has(this.nodeKey(neighbor))) {
          continue;
        }

        const tentativeG = currentNode.g + 1;

        const openNode = this.openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
        if (!openNode || tentativeG < neighbor.g) {
          neighbor.g = tentativeG;
          neighbor.h = this.heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;

          if (!openNode) {
            this.openList.push(neighbor);
          }
        }
      }
    }

    // No path found
    return null;
  }
}
