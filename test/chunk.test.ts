import { describe, expect, it } from "vitest";
import Enumerable from "./sut.js";

describe("chunk", () => {
  it("chunks normally", () => {
    expect(
      Enumerable.from([1, 2, 3, 4, 5]).chunk(2).toArray()
    ).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("chunk larger than length", () => {
    expect(
      Enumerable.from([1, 2]).chunk(10).toArray()
    ).toEqual([[1, 2]]);
  });

  it("chunk size 1", () => {
    expect(
      Enumerable.from([1, 2]).chunk(1).toArray()
    ).toEqual([[1], [2]]);
  });

  it("empty sequence", () => {
    expect(
      Enumerable.from([]).chunk(2).toArray()
    ).toEqual([]);
  });
});