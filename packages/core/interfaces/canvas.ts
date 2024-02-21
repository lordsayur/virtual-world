import { Graph } from "..";

export interface ICanvas {
  width: number;
  height: number;
  clear(): void;
  draw(graph: Graph): void;
  redraw(graph: Graph): void;
}
