import {
  DrawPointOption,
  DrawSegmentOption,
  ICanvas,
  Position,
} from "@virtual-world/core";
import p5 from "p5";

export class P5Canvas implements ICanvas {
  instance: p5;

  constructor(instance: p5) {
    this.instance = instance;
  }

  get width(): number {
    return this.instance.width;
  }

  get height(): number {
    return this.instance.height;
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }

  drawPoint(position: Position, options?: DrawPointOption | undefined): void {
    throw new Error("Method not implemented.");
  }

  drawSegment(
    position1: Position,
    position2: Position,
    options?: DrawSegmentOption | undefined
  ): void {
    throw new Error("Method not implemented.");
  }

  static create(canvasId: string, width: number, height: number): p5 {
    const canvasElement = document.getElementById(canvasId);

    if (canvasElement === null) {
      throw new Error("Canvas element not found");
    }

    const p5Instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(width, height);
        p.strokeWeight(5);
        p.background(0, 100, 0);

        p.translate(p.width / 2, p.height / 2);
        p.rotate(0);
        p.fill(0, 1);
        p.stroke(5);
        p.ellipse(0, 0, 1, 1);
      };
    }, canvasElement);

    if (p5Instance === null) {
      throw new Error("Error while creating p5 instance");
    }

    return p5Instance;
  }
}
