import { expect, describe, test } from "vitest";
import { Graph } from "./graph";
import { Point, Segment } from "../primitives";

describe("Graph", () => {
  describe("TryAddPoint", () => {
    test("Should add point Given no equal point", () => {
      // arrange
      const graph = new Graph([], []);
      const newPoint = new Point(1, 1);

      // act
      const result = graph.tryAddPoint(newPoint);

      // assert
      expect(result).toBeTruthy();
      expect(graph.points).toHaveLength(1);
    });

    test("Should not add point Given has equal point", () => {
      // arrange
      const graph = new Graph([new Point(1, 1)], []);
      const newPoint = new Point(1, 1);

      // act
      const result = graph.tryAddPoint(newPoint);

      // assert
      expect(result).toBeFalsy();
      expect(graph.points).toHaveLength(1);
    });
  });
  describe("TryAddSegment", () => {
    test("Should add segment Given no equal segment And not between same points", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 2);
      const graph = new Graph([point1, point2], []);
      const newSegment = new Segment(point1, point2);

      // act
      const result = graph.tryAddSegment(newSegment);

      // assert
      expect(result).toBeTruthy();
      expect(graph.segments).toHaveLength(1);
    });

    test("Should not add segment Given between same points", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 2);
      const graph = new Graph([point1, point2], []);
      const newSegment = new Segment(point1, point1);

      // act
      const result = graph.tryAddSegment(newSegment);

      // assert
      expect(result).toBeFalsy();
      expect(graph.segments).toHaveLength(0);
    });

    test("Should not add segment Given has equal segment", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 2);
      const segment = new Segment(point2, point1);
      const graph = new Graph([point1, point2], [segment]);
      const newSegment = new Segment(point1, point2);

      // act
      const result = graph.tryAddSegment(newSegment);

      // assert
      expect(result).toBeFalsy();
      expect(graph.segments).toHaveLength(1);
    });
  });
  describe("removeSegment", () => {
    test("should remove segment", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 2);
      const segment = new Segment(point1, point2);
      const graph = new Graph([point1, point2], [segment]);

      // act
      graph.removeSegment(graph.segments[0]);

      //
      expect(graph.segments).toHaveLength(0);
    });
  });
});
