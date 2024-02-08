import { Graph, Point, Segment } from "@virtual-world/core";

import "./style.css";

const ctx = createCanvasContext();

const point1 = new Point(50, 50);
const point2 = new Point(350, 150);

const segment1 = new Segment(point1, point2);

const graph = new Graph([point1, point2], [segment1]);
graph.draw(ctx);

function createCanvasContext(): CanvasRenderingContext2D {
  const canvas = document.getElementById("virtual-world") as HTMLCanvasElement;
  canvas.width = 600;
  canvas.height = 600;

  return canvas.getContext("2d")!;
}

const addRandomPointButton = document.getElementById(
  "add-random-point-btn"
) as HTMLButtonElement;
addRandomPointButton.addEventListener("click", addRandomPoint);

function addRandomPoint() {
  const canvas = document.getElementById("virtual-world") as HTMLCanvasElement;

  const isAdded = graph.tryAddPoint(
    new Point(Math.random() * canvas.width, Math.random() * canvas.height)
  );

  if (!isAdded) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
}
