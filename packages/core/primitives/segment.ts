import { Point } from "./point";

export class Segment {
  constructor(private point1: Point, private point2: Point) {}

  get isBetweenSamePoints(): boolean {
    return this.point1.equals(this.point2);
  }

  equals(segment: Segment) {
    return this.includes(segment.point1) && this.includes(segment.point2);
  }

  includes(point: Point) {
    return this.point1.equals(point) || this.point2.equals(point);
  }

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
