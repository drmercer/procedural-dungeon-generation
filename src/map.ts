import { Feature } from "./feature";

export interface Tile {
  type: string,
  feature?: Feature,
}

function tileEquals(a: Tile, b: Tile) {
  return a.type === b.type && a.feature === b.feature;
}

export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }

  public toString() {
    return `${this.x},${this.y}`;
  }

  public static fromString(str: string): Point {
    const [x, y] = str.split(',');
    return new Point(+x, +y);
  }

  public north(distance = 1) {
    return new Point(this.x, this.y - distance);
  }
  public south(distance = 1) {
    return new Point(this.x, this.y + distance);
  }
  public east(distance = 1) {
    return new Point(this.x + distance, this.y);
  }
  public west(distance = 1) {
    return new Point(this.x - distance, this.y);
  }
}

export interface Box {
  x: number,
  y: number,
  w: number,
  h: number,
}

export class DungeonMap {
  private tiles: Map<string, Tile> = new Map();

  constructor(
    private defaultTileFactory: () => Readonly<Tile>,
  ) { }

  public get(pos: Point): Readonly<Tile> {
    return this.tiles.get(pos.toString()) ?? this.defaultTileFactory();
  }
  public update(pos: Point, tile: Tile) {
    this.tiles.set(pos.toString(), tile);
  }
  public reset(pos: Point) {
    this.tiles.delete(pos.toString());
  }
  public measure(): Box {
    let left = Number.POSITIVE_INFINITY;
    let right = Number.NEGATIVE_INFINITY;
    let top = Number.POSITIVE_INFINITY;
    let bottom = Number.NEGATIVE_INFINITY;
    const defaultTile = this.defaultTileFactory();
    for (const [ptStr, tile] of this.tiles.entries()) {
      const pt = Point.fromString(ptStr);
      if (!tileEquals(tile, defaultTile)) {
        if (pt.x < left) {
          left = pt.x;
        }
        if (pt.x + 1 > right) {
          right = pt.x + 1;
        }
        if (pt.y + 1 > bottom) {
          bottom = pt.y + 1;
        }
        if (pt.y < top) {
          top = pt.y;
        }
      }
    }
    return {
      x: left,
      y: top,
      w: right - left,
      h: bottom - top,
    }
  }
}
