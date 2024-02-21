import {
  DrawPointOption,
  DrawSegmentOption,
  Graph,
  ICanvas,
  Point,
  Position,
  Segment,
} from "@virtual-world/core";

export class HtmlCanvas implements ICanvas {
  private context: CanvasRenderingContext2D;

  constructor(
    private instance: HTMLCanvasElement,
    private drawPointOptions?: DrawPointOption,
    private drawSegmentOptions?: DrawSegmentOption
  ) {
    this.drawPointOptions = drawPointOptions ?? {
      size: 18,
      color: "black",
    };
    this.drawSegmentOptions = drawSegmentOptions ?? {
      width: 2,
      color: "black",
    };

    const ctx = this.instance.getContext("2d");

    if (ctx === null) {
      throw new Error("No canvas 2d context found");
    }

    this.context = ctx;
  }

  get height() {
    return this.instance.height;
  }

  get width() {
    return this.instance.width;
  }

  clear() {
    this.context.clearRect(0, 0, this.instance.width, this.instance.height);
  }

  draw(graph: Graph): void {
    graph.segments.forEach((segment: Segment) => {
      this.drawSegment(
        segment.points.point1.position,
        segment.points.point2.position
      );
    });

    graph.points.forEach((point: Point) => {
      this.drawPoint(point.position);
    });
  }

  redraw(graph: Graph): void {
    this.clear();
    this.draw(graph);
  }

  drawPoint(position: Position): void {
    const rad = this.drawPointOptions?.size! / 2;
    this.context.beginPath();
    this.context.fillStyle = this.drawPointOptions?.color! as string;
    this.context.arc(position.x, position.y, rad, 0, Math.PI * 2);
    this.context.fill();
  }

  drawSegment(position1: Position, position2: Position): void {
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
    backGroundColor: { red: number; green: number; blue: number }
  ): HtmlCanvas {
    const canvasContainer = document.getElementById(canvasId) as HTMLDivElement;

    const canvasElement = canvasContainer.appendChild(
      document.createElement("canvas")
    );

    const { red, green, blue } = backGroundColor;
    canvasElement.style.backgroundColor = `rgb(${red},${green},${blue})`;
    canvasElement.width = width;
    canvasElement.height = height;

    return new HtmlCanvas(canvasElement)!;
  }
}
