import { Point } from "@virtual-world/core";

import "./style.css";

const ctx = createCanvasContext();

const point = new Point(50, 50);
point.draw(ctx);

function createCanvasContext(): CanvasRenderingContext2D {
  const canvas = document.getElementById("virtual-world") as HTMLCanvasElement;
  canvas.width = 600;
  canvas.height = 600;

  return canvas.getContext("2d")!;
}
