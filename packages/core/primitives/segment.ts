import { Point } from "./point";

export class Segment {
  constructor(private point1: Point, private point2: Point) {}

  get points() {
    return {
      point1: this.point1,
      point2: this.point2,
    };
  }

  get isBetweenSamePoints(): boolean {
    return this.point1.equals(this.point2);
  }

  equals(segment: Segment) {
    return this.includes(segment.point1) && this.includes(segment.point2);
  }

  includes(point: Point) {
    return this.point1.equals(point) || this.point2.equals(point);
  }
}
