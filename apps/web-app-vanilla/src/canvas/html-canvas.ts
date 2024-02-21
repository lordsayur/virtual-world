import {
  DrawPointOption,
  DrawSegmentOption,
  ICanvas,
  Position,
} from "@virtual-world/core";

export class HtmlCanvas implements ICanvas {
  public instance: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(instance: HTMLCanvasElement) {
    this.instance = instance;

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

  drawPoint(
    position: Position,
    { size = 18, color = "black" }: DrawPointOption = {}
  ): void {
    const rad = size / 2;
    this.context.beginPath();
    this.context.fillStyle = color;
    this.context.arc(position.x, position.y, rad, 0, Math.PI * 2);
    this.context.fill();
  }

  drawSegment(
    position1: Position,
    position2: Position,
    { width = 2, color = "black" }: DrawSegmentOption = {}
  ): void {
    this.context.beginPath();
    this.context.lineWidth = width;
    this.context.strokeStyle = color;
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
