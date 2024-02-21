import { Graph, Point, Segment } from "@virtual-world/core";
import { P5Canvas } from "../canvas/p5-canvas";
import {
  addRandomPoint,
  addRandomSegment,
  removeRandomSegment,
  removeRandomPoint,
  clearGraph,
} from "../lib";

export function createGraphUsingP5Canvas() {
  const canvas = P5Canvas.create("virtual-world", 600, 600);

  const graph = new Graph(canvas);

  graph
    .addPoint(new Point(100, 100))
    .addPoint(new Point(300, 300))
    .addSegment(new Segment(graph.points[0], graph.points[1]))
    .draw();

  document
    .getElementById("add-random-point-btn")
    ?.addEventListener("click", () => addRandomPoint(graph));

  document
    .getElementById("add-random-segment-btn")
    ?.addEventListener("click", () => addRandomSegment(graph));

  document
    .getElementById("remove-random-segment-btn")
    ?.addEventListener("click", () => removeRandomSegment(graph));

  document
    .getElementById("remove-random-point-btn")
    ?.addEventListener("click", () => removeRandomPoint(graph));

  document
    .getElementById("clear-graph-btn")
    ?.addEventListener("click", () => clearGraph(graph));
}
