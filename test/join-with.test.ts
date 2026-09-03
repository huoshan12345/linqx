import { describe, expect, it } from "vitest";
import Enumerable from "./sut.js";

describe("joinWith", () => {
  it("joins string separator", () => {
    expect(
      Enumerable.from([1, 2, 3]).joinWith(",")
    ).toBe("1,2,3");
  });

  it("joins empty separator", () => {
    expect(
      Enumerable.from([1, 2, 3]).joinWith("")
    ).toBe("123");
  });

  it("maps with selector", () => {
    expect(
      Enumerable.from([1, 2, 3]).joinWith(x => x * 10).toArray()
    ).toEqual([1, 10, 2, 20, 3]);
  });

  it("works on empty sequence", () => {
    expect(
      Enumerable.from([]).joinWith(",")
    ).toBe("");
  });

  it("works on single item", () => {
    expect(
      Enumerable.from([7]).joinWith(",")
    ).toBe("7");
  });
});