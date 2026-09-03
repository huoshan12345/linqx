import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("cycle", function () {
    let actual = Enumerable.cycle(1, 10, 31, 42).take(10).toArray();
    deepEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10]);
    actual = Enumerable.cycle(...[1, 2, 3, 4, 5]).take(10).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);

    const seq = Enumerable.make(1).concat([10]).concat([31]).concat([42]);
    actual = Enumerable.cycle(...seq).take(10).toArray();
    deepEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10]);

    actual = Enumerable.cycle(...Enumerable.range(1, 5)).take(10).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);

    deepEqual(Enumerable.cycle(1, 2, 3).take(5).toArray(), [1, 2, 3, 1, 2]);
  });
});
test('cycle repeats candidates in their original order', () => {
  expect(Enumerable.cycle(1, 2, 3).take(8).toArray()).toEqual([1, 2, 3, 1, 2, 3, 1, 2]);
});

test('cycle returns an empty sequence when no candidates are supplied', () => {
  expect(Enumerable.cycle<number>().toArray()).toEqual([]);
});
