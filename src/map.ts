import { Feature } from "./feature";
import { Point, Box } from "./shape";

export interface Tile {
  type: string,
  feature?: Feature,
}

function tileEquals(a: Tile, b: Tile) {
  return a.type === b.type && a.feature === b.feature;
}

export class DungeonMap {
  private tiles: Map<string, Tile> = new Map();

  constructor(
    public readonly defaultTile: Readonly<Tile>,
  ) { }

  public get(pos: Point): Readonly<Tile> {
    return this.tiles.get(pos.toString()) ?? this.defaultTile;
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
    this.forEachNonDefaultTile((_tile, pt) => {
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
    })
    return {
      x: left,
      y: top,
      w: right - left,
      h: bottom - top,
    }
  }
  public forEachNonDefaultTile(f: (t: Tile, pt: Point) => void) {
    for (const [ptStr, tile] of this.tiles.entries()) {
      const pt = Point.fromString(ptStr);
      if (!tileEquals(tile, this.defaultTile)) {
        f(tile, pt);
      }
    }
  }
}
