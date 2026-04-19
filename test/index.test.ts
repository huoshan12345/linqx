import { describe, it, expect } from "vitest";
import Enumerable from "../index.js";

describe("index", () => {
  it("adds index", () => {
    expect(
      Enumerable.from(["a", "b"]).index().toArray()
    ).toEqual([
      { index: 0, item: "a" },
      { index: 1, item: "b" }
    ]);
  });

  it("empty sequence", () => {
    expect(
      Enumerable.from([]).index().toArray()
    ).toEqual([]);
  });
});