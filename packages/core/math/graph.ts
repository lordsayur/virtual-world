import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Graph {
  points: Point[];
  segments: Segment[];

  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(newPoint: Point) {
    if (this.containsPoint(newPoint)) {
      return false;
    }

    this.points.push(newPoint);

    return true;
  }

  removePoint(point: Point) {
    const segments = this.getSegmentsWithPoint(point);

    segments.forEach((segment: Segment) => {
      this.removeSegment(segment);
    });

    this.points.splice(this.points.indexOf(point), 1);
  }

  containsPoint(point: Point) {
    return this.points.some((p) => p.equals(point));
  }

  addSegment(newSegment: Segment) {
    if (newSegment.isBetweenSamePoints || this.containsSegment(newSegment)) {
      return false;
    }

    this.segments.push(newSegment);

    return true;
  }

  containsSegment(segment: Segment) {
    return this.segments.some((s) => s.equals(segment));
  }

  removeSegment(segment: Segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point: Point): Segment[] {
    return this.segments.filter((s) => s.includes(point));
  }

  dispose() {
    this.points = [];
    this.segments = [];
  }
}
