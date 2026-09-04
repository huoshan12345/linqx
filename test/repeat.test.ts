import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("repeat", function () {
    let actual = Enumerable.repeat("temp").take(3).toArray();
    expect(actual).toEqual(["temp", "temp", "temp"]);
    actual = Enumerable.repeat("temp", 5).toArray();
    expect(actual).toEqual(["temp", "temp", "temp", "temp", "temp"]);
  });
});
test('repeat emits exactly the requested count', () => {
  expect(Enumerable.repeat('value', 3).toArray()).toEqual(['value', 'value', 'value']);
});

test('repeat returns an empty sequence for a non-positive count', () => {
  expect(Enumerable.repeat(1, 0).toArray()).toEqual([]);
  expect(Enumerable.repeat(1, -1).toArray()).toEqual([]);
});
