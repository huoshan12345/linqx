import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Functional", () => {
  test("memoize", function () {
    let count = 0;
    const mem = Enumerable.range(1, 5)
      .select(function (x) { count++; return x; })
      .memoize();
    const ar1 = mem.toArray();
    const ar2 = mem.toArray();
    expect(ar1).toEqual([1, 2, 3, 4, 5]);
    expect(ar2).toEqual([1, 2, 3, 4, 5]);
    expect(5).toBe(count);

    const memWithUndefined = Enumerable.from([1, 2, undefined, 3, 4])
      .memoize();

    const arWithUndefined1 = memWithUndefined.toArray();
    const arWithUndefined2 = memWithUndefined.toArray();
    expect(arWithUndefined1).toEqual([1, 2, undefined, 3, 4]);
    expect(arWithUndefined2).toEqual([1, 2, undefined, 3, 4]);
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
