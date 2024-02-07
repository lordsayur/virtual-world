export class Graph {
  constructor(private points: Point[], private segments: Segment[]) {}

  draw(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    size: number = 18,
    color: string = "black"
  ) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Segment {
  constructor(private point1: Point, private point2: Point) {}

  draw(
    ctx: CanvasRenderingContext2D,
    width: number = 2,
    color: string = "black"
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.point1.x, this.point1.y);
    ctx.lineTo(this.point2.x, this.point2.y);
    ctx.stroke();
  }
}
