import { ICanvas, Position } from "..";

export class Point {
  constructor(
    private x: number,
    private y: number,
    private size: number = 18,
    private color: string = "black"
  ) {}

  get position(): Position {
    return { x: this.x, y: this.y };
  }

  equals(point: Point) {
    return this.x == point.x && this.y == point.y;
  }

  draw(ctx: ICanvas) {
    ctx.drawPoint(this.position, { size: this.size, color: this.color });
  }
}
