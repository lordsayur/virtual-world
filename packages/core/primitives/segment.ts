import { SegmentStyleOption } from "..";
import { Point } from "./point";

export class Segment {
  constructor(
    private point1: Point,
    private point2: Point,
    private styleOption?: SegmentStyleOption
  ) {}

  get points() {
    return {
      point1: this.point1,
      point2: this.point2,
    };
  }

  get style(): SegmentStyleOption {
    return (
      this.styleOption ?? {
        width: 2,
        color: { r: 0, g: 0, b: 0 },
      }
    );
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
