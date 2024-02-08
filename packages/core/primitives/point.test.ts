import { describe, test, expect } from "vitest";
import { Point } from "./point";

describe("Point", () => {
  describe("Equals", () => {
    test("Should return true if same point", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 1);

      // act
      const isEqual = point1.equals(point2);

      // assert
      expect(isEqual).toBeTruthy();
    });

    test("Should return false if not the same point", () => {
      // arrange
      const point1 = new Point(1, 1);
      const point2 = new Point(1, 2);

      // act
      const isEqual = point1.equals(point2);

      // assert
      expect(isEqual).toBeFalsy();
    });
  });
});
