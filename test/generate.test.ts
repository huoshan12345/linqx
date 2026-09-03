import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("generate", function () {
    let actual = Enumerable.generate(function () { return "temp"; }).take(3).toArray();
    expect(actual).toEqual(["temp", "temp", "temp"]);
    actual = Enumerable.generate(function () { return "temp"; }, 5).toArray();
    expect(actual).toEqual(["temp", "temp", "temp", "temp", "temp"]);
  });
});
test('generate invokes the factory once per requested element', () => {
  const factory = vi.fn(() => 5);

  expect(Enumerable.generate(factory, 3).toArray()).toEqual([5, 5, 5]);
  expect(factory).toHaveBeenCalledTimes(3);
});

test('generate with a non-positive count produces no elements', () => {
  const factory = vi.fn(() => 1);

  expect(Enumerable.generate(factory, 0).toArray()).toEqual([]);
  expect(factory).not.toHaveBeenCalled();
});
