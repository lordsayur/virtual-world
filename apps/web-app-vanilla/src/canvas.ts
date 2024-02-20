export class Canvas {
  public instance: HTMLCanvasElement;

  constructor(instance: HTMLCanvasElement) {
    this.instance = instance;
  }

  get context(): CanvasRenderingContext2D {
    const ctx = this.instance.getContext("2d");

    if (ctx === null) {
      throw new Error("No canvas 2d context found");
    }

    return ctx;
  }

  static create(canvasId: string, width: number, height: number): Canvas {
    const canvasElement = document.getElementById(
      canvasId
    ) as HTMLCanvasElement;

    canvasElement.width = width;
    canvasElement.height = height;

    return new Canvas(canvasElement)!;
  }

  clear() {
    this.context.clearRect(0, 0, this.instance.width, this.instance.height);
  }
}
