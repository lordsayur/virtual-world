import {
  Graph,
  ICanvas,
  Point,
  RgbColor,
  Segment,
} from "@virtual-world/core";
import p5 from "p5";

export class P5Canvas implements ICanvas {
  constructor(
    private graph: Graph,
    private canvasElement: HTMLElement,
    width: number,
    height: number,
    private backgroundColor: RgbColor
  ) {
    this.width = width;
    this.height = height;
  }

  width: number;
  height: number;

  get points() {
    return this.graph.points;
  }

  get segments() {
    return this.graph.segments;
  }

  addPoint(point: Point): boolean {
    return this.graph.addPoint(point);
  }

  removePoint(point: Point): void {
    this.graph.removePoint(point);
  }

  addSegment(segment: Segment): boolean {
    return this.graph.addSegment(segment);
  }

  removeSegment(segment: Segment): void {
    this.graph.removeSegment(segment);
  }

  clear(): void {
    this.graph.dispose();
  }

  draw() {
    const { r, g, b } = this.backgroundColor;

    const p5Instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(this.width, this.height);
        p.strokeWeight(5);
        p.background(r, g, b);
      };

      p.draw = () => {
        p.background(r, g, b);
        this.graph.segments.forEach((segment: Segment) => {
          this.drawSegment(p, segment);
        });

        this.graph.points.forEach((point: Point) => {
          this.drawPoint(p, point);
        });
      };
    }, this.canvasElement);

    if (p5Instance === null) {
      throw new Error("Error while creating p5 instance");
    }
  }

  private drawPoint(p5: p5, point: Point): void {
    const color = point.style.color;
    p5.fill(color.r, color.g, color.b);
    p5.stroke(color.r, color.g, color.b);
    p5.ellipse(
      point.position.x,
      point.position.y,
      point.style.size,
      point.style.size
    );
  }

  private drawSegment(p5: p5, segment: Segment): void {
    const { point1: p1, point2: p2 } = segment.points;
    const color = segment.style.color;
    p5.fill(color.r, color.g, color.b);
    p5.stroke(color.r, color.g, color.b);
    p5.strokeWeight(segment.style.width);
    p5.line(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
  }

  static create(
    canvasId: string,
    width: number,
    height: number,
    backgroundColor: RgbColor
  ): P5Canvas {
    const graph = new Graph();
    const canvasElement = document.getElementById(canvasId);

    if (canvasElement === null) {
      throw new Error("Canvas element not found");
    }

    const canvas = new P5Canvas(
      graph,
      canvasElement,
      width,
      height,
      backgroundColor
    );

    canvas.draw();

    return canvas;
  }
}
