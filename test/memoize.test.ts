import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, test } from './test-utils.js';

describe("Functional", () => {
  test("memoize", function () {
    let count = 0;
    const mem = Enumerable.range(1, 5)
      .select(function (x) { count++; return x; })
      .memoize();
    const ar1 = mem.toArray();
    const ar2 = mem.toArray();
    deepEqual(ar1, [1, 2, 3, 4, 5]);
    deepEqual(ar2, [1, 2, 3, 4, 5]);
    equal(5, count);

    const memWithUndefined = Enumerable.from([1, 2, undefined, 3, 4])
      .memoize();

    const arWithUndefined1 = memWithUndefined.toArray();
    const arWithUndefined2 = memWithUndefined.toArray();
    deepEqual(arWithUndefined1, [1, 2, undefined, 3, 4]);
    deepEqual(arWithUndefined2, [1, 2, undefined, 3, 4]);
  });
});
test('memoize reuses a partially populated cache', () => {
  const selector = vi.fn((value: number) => value);
  const sequence = Enumerable.range(1, 4).select(selector).memoize();

  expect(sequence.take(2).toArray()).toEqual([1, 2]);
  expect(sequence.toArray()).toEqual([1, 2, 3, 4]);
  expect(selector).toHaveBeenCalledTimes(4);
});

test('memoize stops reading its source after disposal but retains cached values', () => {
  const sequence = Enumerable.range(1, 4).memoize();

  expect(sequence.take(1).toArray()).toEqual([1]);
  sequence.dispose();

  expect(sequence.toArray()).toEqual([1]);
});
