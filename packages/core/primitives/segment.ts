import { Point } from "./point";

export class Segment {
  constructor(private point1: Point, private point2: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    width: number = 2,
    color: string = "black"
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
  }
}
