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

  public plus(xd: number, yd: number) {
    return new Point(this.x + xd, this.y + yd);
  }

  public north(distance = 1) {
    return this.plus(0, -distance);
  }
  public south(distance = 1) {
    return this.plus(0, distance);
  }
  public east(distance = 1) {
    return this.plus(distance, 0);
  }
  public west(distance = 1) {
    return this.plus(-distance, 0);
  }
}

export interface Box {
  x: number,
  y: number,
  w: number,
  h: number,
}
