import { Graph, ICanvas, Point, RgbColor, Segment } from "@virtual-world/core";

export class HtmlCanvas implements ICanvas {
  private context: CanvasRenderingContext2D;

  constructor(private graph: Graph, private instance: HTMLCanvasElement) {
    const ctx = this.instance.getContext("2d");

    if (ctx === null) {
      throw new Error("No canvas 2d context found");
    }

    this.context = ctx;
  }

  get width() {
    return this.instance.width;
  }

  get height() {
    return this.instance.height;
  }

  get points() {
    return this.graph.points;
  }

  get segments() {
    return this.graph.segments;
  }

  addPoint(point: Point): boolean {
    const isAdded = this.graph.addPoint(point);

    if (isAdded) this.redraw();

    return isAdded;
  }

  removePoint(point: Point): void {
    this.graph.removePoint(point);
    this.redraw();
  }

  addSegment(segment: Segment): boolean {
    const isAdded = this.graph.addSegment(segment);

    if (isAdded) this.redraw();

    return isAdded;
  }

  removeSegment(segment: Segment): void {
    this.graph.removeSegment(segment);
    this.redraw();
  }

  clear() {
    this.graph.dispose();
    this.redraw();
  }

  draw(): void {
    this.graph.segments.forEach((segment: Segment) => {
      this.drawSegment(segment);
    });

    this.graph.points.forEach((point: Point) => {
      this.drawPoint(point);
    });
  }

  private redraw(): void {
    this.context.clearRect(0, 0, this.instance.width, this.instance.height);
    this.draw();
  }

  private drawPoint(point: Point): void {
    const {
      color: { r, g, b },
      size,
    } = point.style;

    const rad = size / 2;
    this.context.beginPath();
    this.context.fillStyle = `rgb(${r},${g},${b})`;
    this.context.arc(point.position.x, point.position.y, rad, 0, Math.PI * 2);
    this.context.fill();
  }

  private drawSegment(segment: Segment): void {
    const { point1: p1, point2: p2 } = segment.points;
    const {
      color: { r, g, b },
      width,
    } = segment.style;

    this.context.beginPath();
    this.context.lineWidth = width;
    this.context.strokeStyle = `rgb(${r},${g},${b})`;
    this.context.moveTo(p1.position.x, p1.position.y);
    this.context.lineTo(p2.position.x, p2.position.y);
    this.context.stroke();
  }

  static create(
    canvasId: string,
    width: number,
    height: number,
    backGroundColor: RgbColor
  ): HtmlCanvas {
    const canvasContainer = document.getElementById(canvasId) as HTMLDivElement;

    const graph = new Graph();
    const canvasElement = canvasContainer.appendChild(
      document.createElement("canvas")
    );

    const { r, g, b } = backGroundColor;
    canvasElement.style.backgroundColor = `rgb(${r},${g},${b})`;
    canvasElement.width = width;
    canvasElement.height = height;

    return new HtmlCanvas(graph, canvasElement);
  }
}
