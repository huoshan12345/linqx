import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("toInfinity", function () {
    let actual = Enumerable.toInfinity().where((i) => i % 2 === 0).take(10).toArray();
    deepEqual(actual, [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
    actual = Enumerable.toInfinity(101).take(5).toArray();
    deepEqual(actual, [101, 102, 103, 104, 105]);
    actual = Enumerable.toInfinity(101, 5).take(5).toArray();
    deepEqual(actual, [101, 106, 111, 116, 121]);
  });
});
test('toInfinity supports a custom start and step', () => {
  expect(Enumerable.toInfinity(5, 2).take(4).toArray()).toEqual([5, 7, 9, 11]);
});

test('toInfinity can emit a constant value when the step is zero', () => {
  expect(Enumerable.toInfinity(3, 0).take(3).toArray()).toEqual([3, 3, 3]);
});
