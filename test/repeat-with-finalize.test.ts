import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("repeatWithFinalize", function () {
    let fin;
    const actual = Enumerable.repeatWithFinalize(
      function () { return "temp"; },
      function () { fin = "final"; })
      .take(3).toArray();
    expect(actual).toEqual(["temp", "temp", "temp"]);
    expect("final").toBe(fin);
  });
});
test('repeatWithFinalize finalizes after early termination', () => {
  const finalizer = vi.fn();

  expect(Enumerable.repeatWithFinalize(() => ({ id: 1 }), finalizer).take(2).count()).toBe(2);
  expect(finalizer).toHaveBeenCalledOnce();
});

test('repeatWithFinalize initializes and finalizes once per enumeration', () => {
  const initializer = vi.fn(() => 1);
  const finalizer = vi.fn();
  const sequence = Enumerable.repeatWithFinalize(initializer, finalizer).take(1);

  sequence.force();
  sequence.force();

  expect(initializer).toHaveBeenCalledTimes(2);
  expect(finalizer).toHaveBeenCalledTimes(2);
});
