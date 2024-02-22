import {
  DrawPointOption,
  DrawSegmentOption,
  Graph,
  ICanvas,
  Point,
  Position,
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
    private drawPointOptions?: DrawPointOption,
    private drawSegmentOptions?: DrawSegmentOption
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
    const p5Instance = new p5((p: p5) => {
      p.setup = () => {
        p.createCanvas(this.width, this.height);
        p.strokeWeight(5);
        p.background(0, 100, 0);
      };

      p.draw = () => {
        p.background(0, 100, 0);
        this.graph.points.forEach((point: Point) => {
          this.drawPoint(p, point.position);
        });

        this.graph.segments.forEach((segment: Segment) => {
          this.drawSegment(
            p,
            segment.points.point1.position,
            segment.points.point2.position
          );
        });
      };
    }, this.canvasElement);

    if (p5Instance === null) {
      throw new Error("Error while creating p5 instance");
    }
  }

  private drawPoint(p5: p5, position: Position): void {
    const color = this.drawPointOptions!.color as RgbColor;
    p5.fill(color.r, color.g, color.b);
    p5.stroke(this.drawPointOptions?.size!);
    p5.ellipse(position.x, position.y, 18, 18);
  }

  private drawSegment(p5: p5, position1: Position, position2: Position): void {
    const color = this.drawSegmentOptions!.color as RgbColor;
    p5.fill(color.r, color.g, color.b);
    p5.stroke(color.r, color.g, color.b);
    p5.strokeWeight(this.drawSegmentOptions?.width!);
    p5.line(position1.x, position1.y, position2.x, position2.y);
  }

  static create(canvasId: string, width: number, height: number): P5Canvas {
    const graph = new Graph();
    const drawPointOptions: DrawPointOption = {
      size: 18,
      color: { r: 0, g: 0, b: 0 },
    };
    const drawSegmentOptions: DrawSegmentOption = {
      width: 2,
      color: { r: 0, g: 0, b: 0 },
    };
    const canvasElement = document.getElementById(canvasId);

    if (canvasElement === null) {
      throw new Error("Canvas element not found");
    }

    const canvas = new P5Canvas(
      graph,
      canvasElement,
      width,
      height,
      drawPointOptions,
      drawSegmentOptions
    );

    canvas.draw();

    return canvas;
  }
}
