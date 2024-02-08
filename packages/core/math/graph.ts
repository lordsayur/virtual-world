import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Graph {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[], segments: Segment[]) {
    this.points = points;
    this.segments = segments;
  }

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

  tryAddSegment(newSegment: Segment) {
    if (newSegment.isBetweenSamePoints || this.containsSegment(newSegment)) {
      return false;
    }

    this.addSegment(newSegment);

    return true;
  }

  addSegment(newSegment: Segment) {
    this.segments.push(newSegment);
  }

  containsSegment(segment: Segment) {
    return this.segments.some((s) => s.equals(segment));
  }
}
