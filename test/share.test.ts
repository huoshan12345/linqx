import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Functional", () => {
  test("share", function () {
    const share = Enumerable.range(1, 10).share();
    const ar1 = share.take(4).toArray();
    const ar2 = share.toArray();
    const ar3 = share.toArray();
    expect(ar1).toEqual([1, 2, 3, 4]);
    expect(ar2).toEqual([5, 6, 7, 8, 9, 10]);
    expect(ar3).toEqual([]);
  });
});
test('share distributes one source iterator between consumers', () => {
  const sequence = Enumerable.range(1, 5).share();
  const first = sequence[Symbol.iterator]();
  const second = sequence[Symbol.iterator]();

  expect(first.next().value).toBe(1);
  expect(second.next().value).toBe(2);
  expect(first.next().value).toBe(3);
});

test('share completes all consumers after disposal', () => {
  const sequence = Enumerable.range(1, 5).share();
  const iterator = sequence[Symbol.iterator]();

  expect(iterator.next().value).toBe(1);
  sequence.dispose();

  expect(iterator.next().done).toBe(true);
  expect(sequence.toArray()).toEqual([]);
});
