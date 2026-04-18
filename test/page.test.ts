import { describe, it, expect } from "vitest";
import Enumerable from "../index";

describe("page", () => {
  it("pages normally", () => {
    expect(
      Enumerable.from([1, 2, 3, 4, 5]).page(2, 2).toArray()
    ).toEqual([3, 4]);
  });

  it("supports object overload", () => {
    expect(
      Enumerable.from([1, 2, 3, 4, 5]).page({ pageNumber: 3, pageSize: 2 }).toArray()
    ).toEqual([5]);
  });

  it("returns empty when page out of range", () => {
    expect(
      Enumerable.from([1, 2, 3]).page(5, 2).toArray()
    ).toEqual([]);
  });

  it("works with exact final page", () => {
    expect(
      Enumerable.from([1, 2, 3, 4]).page(2, 2).toArray()
    ).toEqual([3, 4]);
  });

  it("works on empty sequence", () => {
    expect(
      Enumerable.from([]).page(1, 10).toArray()
    ).toEqual([]);
  });
});