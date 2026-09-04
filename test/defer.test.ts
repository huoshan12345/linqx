import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("defer", function () {
    const xs: number[] = [];

    const r = Enumerable.range(1, 5)
      .doAction(function (x) { xs.push(x); });

    const de = Enumerable.defer(function () { return r; });

    expect(xs.length).toBe(0);

    expect(de.toArray()).toEqual([1, 2, 3, 4, 5]);
    expect(xs).toEqual([1, 2, 3, 4, 5]);
  });
});
test('defer does not invoke the factory before enumeration', () => {
  const factory = vi.fn(() => Enumerable.make(1));
  const sequence = Enumerable.defer(factory);

  expect(factory).not.toHaveBeenCalled();
  expect(sequence.toArray()).toEqual([1]);
});

test('defer invokes the factory for every enumeration', () => {
  let value = 0;
  const sequence = Enumerable.defer(() => Enumerable.make(++value));

  expect(sequence.toArray()).toEqual([1]);
  expect(sequence.toArray()).toEqual([2]);
});
