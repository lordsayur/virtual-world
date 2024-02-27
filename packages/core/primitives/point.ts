import { PointStyleOption, Position } from "..";

export class Point {
  constructor(
    private x: number,
    private y: number,
    private styleOption?: PointStyleOption
  ) {}

  get position(): Position {
    return { x: this.x, y: this.y };
  }

  get style(): PointStyleOption {
    return (
      this.styleOption ?? {
        size: 18,
        color: { r: 0, g: 0, b: 0 },
      }
    );
  }

  equals(point: Point) {
    return this.x == point.x && this.y == point.y;
  }
}
