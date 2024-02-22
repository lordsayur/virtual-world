import "./style.css";

import { ICanvas, Point, Segment } from "@virtual-world/core";
import {
  addRandomPoint,
  addRandomSegment,
  removeRandomSegment,
  removeRandomPoint,
  clearGraph,
} from "./lib";
import { HtmlCanvas } from "./canvas/html-canvas";
import { P5Canvas } from "./canvas/p5-canvas";

enum CanvasType {
  HTML = "html-canvas",
  P5 = "p5-canvas",
}

const isPageForP5Canvas = window.location.pathname.includes("p5");

const canvasInstance = initialize();
registerEventListeners(canvasInstance);

function initialize() {
  const canvas = createCanvas(
    isPageForP5Canvas ? CanvasType.P5 : CanvasType.HTML
  );

  const point1 = new Point(50, 50);
  const point2 = new Point(350, 150);

  canvas.addPoint(point1);
  canvas.addPoint(point2);
  canvas.addSegment(new Segment(point1, point2));

  return canvas;
}

function createCanvas(canvasType: CanvasType): ICanvas {
  switch (canvasType) {
    case CanvasType.HTML:
      return HtmlCanvas.create("virtual-world", 600, 600, {
        r: 0,
        g: 100,
        b: 0,
      });

    case CanvasType.P5:
      return P5Canvas.create("virtual-world", 600, 600);

    default:
      throw new Error("Invalid canvas type");
  }
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
