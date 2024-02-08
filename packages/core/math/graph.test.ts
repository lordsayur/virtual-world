// sum.test.js
import { expect, describe, test } from "vitest";
import { Graph } from "./graph";
import { Point } from "../primitives";

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
    });

    test("Should not add point Given has equal point", () => {
      // arrange
      const graph = new Graph([new Point(1, 1)], []);
      const newPoint = new Point(1, 1);

      // act
      const result = graph.tryAddPoint(newPoint);

      // assert
      expect(result).toBeFalsy();
    });
  });
});
