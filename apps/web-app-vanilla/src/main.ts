import { Graph, Point, Segment } from "@virtual-world/core";
import { HtmlCanvas } from "./canvas/html-canvas";

import "./style.css";

const canvas = HtmlCanvas.create("virtual-world", 600, 600);

const point1 = new Point(50, 50);
const point2 = new Point(350, 150);

const segment1 = new Segment(point1, point2);

const graph = new Graph([point1, point2], [segment1], canvas);
graph.draw();

const addRandomPointButton = document.getElementById(
  "add-random-point-btn"
) as HTMLButtonElement;
addRandomPointButton.addEventListener("click", addRandomPoint);

function addRandomPoint() {
  const isAdded = graph.tryAddPoint(
    new Point(
      Math.random() * canvas.instance.width,
      Math.random() * canvas.instance.height
    )
  );

  if (!isAdded) {
    return;
  }

  graph.draw();
}

const addRandomSegmentButton = document.getElementById(
  "add-random-segment-btn"
) as HTMLButtonElement;
addRandomSegmentButton.addEventListener("click", addRandomSegment);

function addRandomSegment() {
  const point1Index = Math.floor(Math.random() * graph.points.length);
  const point2Index = Math.floor(Math.random() * graph.points.length);

  const segmentAdded = graph.tryAddSegment(
    new Segment(graph.points[point1Index], graph.points[point2Index])
  );

  if (!segmentAdded) {
    return;
  }

  graph.draw();
}

const removeRandomSegmentButton = document.getElementById(
  "remove-random-segment-btn"
);
removeRandomSegmentButton?.addEventListener("click", removeRandomSegment);

function removeRandomSegment() {
  if (graph.segments.length == 0) {
    alert("No segments");
    return;
  }

  const segmentIndex = Math.floor(Math.random() * graph.segments.length);
  graph.removeSegment(graph.segments[segmentIndex]);

  graph.draw();
}

const removeRandomPointButton = document.getElementById(
  "remove-random-point-btn"
);
removeRandomPointButton?.addEventListener("click", removeRandomPoint);

function removeRandomPoint() {
  if (graph.points.length == 0) {
    alert("No points");
    return;
  }

  const pointIndex = Math.floor(Math.random() * graph.points.length);
  graph.removePoint(graph.points[pointIndex]);

  graph.draw();
}

const clearGraphButton = document.getElementById("clear-graph-btn");
clearGraphButton?.addEventListener("click", clearGraph);

function clearGraph() {
  graph.dispose();

  graph.draw();
}
