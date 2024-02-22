import { ICanvas, Point, Segment } from "@virtual-world/core";

export function addRandomPoint(canvas: ICanvas) {
  canvas.addPoint(
    new Point(Math.random() * canvas.width, Math.random() * canvas.height)
  );
}

export function addRandomSegment(canvas: ICanvas) {
  const point1Index = Math.floor(Math.random() * canvas.points.length);
  const point2Index = Math.floor(Math.random() * canvas.points.length);

  canvas.addSegment(
    new Segment(canvas.points[point1Index], canvas.points[point2Index])
  );
}

export function removeRandomSegment(canvas: ICanvas) {
  if (canvas.segments.length == 0) {
    alert("No segments");
    return;
  }

  const segmentIndex = Math.floor(Math.random() * canvas.segments.length);
  canvas.removeSegment(canvas.segments[segmentIndex]);
}

export function removeRandomPoint(canvas: ICanvas) {
  if (canvas.points.length == 0) {
    alert("No points");
    return;
  }

  const pointIndex = Math.floor(Math.random() * canvas.points.length);
  canvas.removePoint(canvas.points[pointIndex]);
}

export function clearGraph(canvas: ICanvas) {
  canvas.clear();
}
