import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Graph {
  constructor(private points: Point[], private segments: Segment[]) {}

  draw(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  tryAddPoint(newPoint: Point): boolean {
    if (this.containsPoint(newPoint)) {
      return false;
    }

    this.addPoint(newPoint);

    return true;
  }

  addPoint(newPoint: Point) {
    this.points.push(newPoint);
  }

  containsPoint(point: Point) {
    return this.points.some((p) => p.equals(point));
  }
}
