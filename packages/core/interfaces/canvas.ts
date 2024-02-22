import { Point, Segment } from "..";

export interface ICanvas {
  width: number;
  height: number;
  points: Point[];
  segments: Segment[];
  addPoint(point: Point): boolean;
  removePoint(point: Point): void;
  addSegment(segment: Segment): boolean;
  removeSegment(segment: Segment): void;
  draw(): void;
  clear(): void;
}
