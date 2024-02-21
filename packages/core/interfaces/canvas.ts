import { Position } from "..";

export interface ICanvas {
  width: number;
  height: number;
  clear(): void;
  drawPoint(position: Position, options?: DrawPointOption): void;
  drawSegment(
    position1: Position,
    position2: Position,
    options?: DrawSegmentOption
  ): void;
}

export type DrawPointOption = {
  size?: number;
  color?: string;
};

export type DrawSegmentOption = {
  width?: number;
  color?: string;
};
