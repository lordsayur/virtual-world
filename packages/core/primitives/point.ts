import { Position } from "..";

export class Point {
  constructor(private x: number, private y: number) {}

  get position(): Position {
    return { x: this.x, y: this.y };
  }

  equals(point: Point) {
    return this.x == point.x && this.y == point.y;
  }
}
