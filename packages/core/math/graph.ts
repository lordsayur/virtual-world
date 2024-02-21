import { ICanvas } from "..";
import { Point } from "../primitives/point";
import { Segment } from "../primitives/segment";

export class Graph {
  points: Point[];
  segments: Segment[];

  canvas: ICanvas;

  constructor(canvas: ICanvas, points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
    this.canvas = canvas;
  }

  draw() {
    this.canvas.clear();
    for (const segment of this.segments) {
      segment.draw(this.canvas);
    }

    for (const point of this.points) {
      point.draw(this.canvas);
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
    return this;
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
    return this;
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

  removePoint(point: Point) {
    const segments = this.getSegmentsWithPoint(point);
    segments.forEach((segment: Segment) => {
      this.removeSegment(segment);
    });

    this.points.splice(this.points.indexOf(point), 1);
  }

  dispose() {
    this.points = [];
    this.segments = [];
  }
}
