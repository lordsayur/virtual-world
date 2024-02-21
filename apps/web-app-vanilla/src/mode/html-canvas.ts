import { Graph, Point, Segment } from "@virtual-world/core";
import { HtmlCanvas } from "../canvas/html-canvas";
import {
  addRandomPoint,
  addRandomSegment,
  removeRandomSegment,
  removeRandomPoint,
  clearGraph,
} from "../lib";

export function createGraphUsingHtmlCanvas() {
  const canvas = HtmlCanvas.create("virtual-world", 600, 600, {
    red: 0,
    green: 100,
    blue: 0,
  });

  const graph = new Graph(canvas);

  graph
    .addPoint(new Point(50, 50))
    .addPoint(new Point(350, 150))
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
