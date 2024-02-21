import { Graph, Point, Segment } from "@virtual-world/core";

export function addRandomPoint(graph: Graph) {
  const isAdded = graph.tryAddPoint(
    new Point(
      Math.random() * graph.canvas.width,
      Math.random() * graph.canvas.height
    )
  );

  if (!isAdded) {
    return;
  }

  graph.redraw();
}

export function addRandomSegment(graph: Graph) {
  const point1Index = Math.floor(Math.random() * graph.points.length);
  const point2Index = Math.floor(Math.random() * graph.points.length);

  const segmentAdded = graph.tryAddSegment(
    new Segment(graph.points[point1Index], graph.points[point2Index])
  );

  if (!segmentAdded) {
    return;
  }

  graph.redraw();
}

export function removeRandomSegment(graph: Graph) {
  if (graph.segments.length == 0) {
    alert("No segments");
    return;
  }

  const segmentIndex = Math.floor(Math.random() * graph.segments.length);
  graph.removeSegment(graph.segments[segmentIndex]);

  graph.redraw();
}

export function removeRandomPoint(graph: Graph) {
  if (graph.points.length == 0) {
    alert("No points");
    return;
  }

  const pointIndex = Math.floor(Math.random() * graph.points.length);
  graph.removePoint(graph.points[pointIndex]);

  graph.redraw();
}

export function clearGraph(graph: Graph) {
  graph.dispose();

  graph.redraw();
}
