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

export class HtmlCanvas implements ICanvas {
  private context: CanvasRenderingContext2D;

  constructor(
    private graph: Graph,
    private instance: HTMLCanvasElement,
    private drawPointOptions?: DrawPointOption,
    private drawSegmentOptions?: DrawSegmentOption
  ) {
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
      this.drawSegment(
        segment.points.point1.position,
        segment.points.point2.position
      );
    });

    this.graph.points.forEach((point: Point) => {
      this.drawPoint(point.position);
    });
  }

  private redraw(): void {
    this.context.clearRect(0, 0, this.instance.width, this.instance.height);
    this.draw();
  }

  private drawPoint(position: Position): void {
    const rad = this.drawPointOptions?.size! / 2;
    this.context.beginPath();
    this.context.fillStyle = this.drawPointOptions?.color! as string;
    this.context.arc(position.x, position.y, rad, 0, Math.PI * 2);
    this.context.fill();
  }

  private drawSegment(position1: Position, position2: Position): void {
    this.context.beginPath();
    this.context.lineWidth = this.drawSegmentOptions?.width!;
    this.context.strokeStyle = this.drawSegmentOptions?.color! as string;
    this.context.moveTo(position1.x, position1.y);
    this.context.lineTo(position2.x, position2.y);
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
    const drawPointOptions = {
      size: 18,
      color: "black",
    };
    const drawSegmentOptions = {
      width: 2,
      color: "black",
    };
    const canvasElement = canvasContainer.appendChild(
      document.createElement("canvas")
    );

    const { r, g, b } = backGroundColor;
    canvasElement.style.backgroundColor = `rgb(${r},${g},${b})`;
    canvasElement.width = width;
    canvasElement.height = height;

    return new HtmlCanvas(
      graph,
      canvasElement,
      drawPointOptions,
      drawSegmentOptions
    );
  }
}
