import { describe, expect, it } from "vitest";
import Enumerable from "./sut.js";

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
test('index is deferred and indexes each enumeration from zero', () => {
  const sequence = Enumerable.from(['a', 'b']).index();

  expect(sequence.map(value => value.index)).toEqual([0, 1]);
  expect(sequence.map(value => value.index)).toEqual([0, 1]);
});
