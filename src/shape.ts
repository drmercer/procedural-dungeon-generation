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
