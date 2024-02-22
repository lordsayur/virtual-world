import "./style.css";

import { ICanvas, Point, Segment } from "@virtual-world/core";
import { HtmlCanvas } from "./canvas/html-canvas";
// import { P5Canvas } from "./canvas/p5-canvas";
import {
  addRandomPoint,
  addRandomSegment,
  removeRandomSegment,
  removeRandomPoint,
  clearGraph,
} from "./lib";

const canvasInstance = initialize();
registerEventListeners(canvasInstance);

function initialize() {
  const canvas = HtmlCanvas.create("virtual-world", 600, 600, {
    r: 0,
    g: 100,
    b: 0,
  });

  // const canvas = P5Canvas.create("virtual-world", 600, 600);

  const point1 = new Point(50, 50);
  const point2 = new Point(350, 150);

  canvas.addPoint(point1);
  canvas.addPoint(point2);
  canvas.addSegment(new Segment(point1, point2));

  return canvas;
}

function registerEventListeners(canvas: ICanvas) {
  document
    .getElementById("add-random-point-btn")
    ?.addEventListener("click", () => addRandomPoint(canvas));

  document
    .getElementById("add-random-segment-btn")
    ?.addEventListener("click", () => addRandomSegment(canvas));

  document
    .getElementById("remove-random-segment-btn")
    ?.addEventListener("click", () => removeRandomSegment(canvas));

  document
    .getElementById("remove-random-point-btn")
    ?.addEventListener("click", () => removeRandomPoint(canvas));

  document
    .getElementById("clear-graph-btn")
    ?.addEventListener("click", () => clearGraph(canvas));
}
