import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("rangeTo", function () {
    let actual = Enumerable.rangeTo(5, 10).toArray();
    deepEqual(actual, [5, 6, 7, 8, 9, 10]);
    actual = Enumerable.rangeTo(1, 10, 3).toArray();
    deepEqual(actual, [1, 4, 7, 10]);
    actual = Enumerable.rangeTo(-2, -8).toArray();
    deepEqual(actual, [-2, -3, -4, -5, -6, -7, -8]);
    actual = Enumerable.rangeTo(-2, -8, 2).toArray();
    deepEqual(actual, [-2, -4, -6, -8]);

    deepEqual(Enumerable.rangeTo(1, 4).toArray(), [1, 2, 3, 4]);
    deepEqual(Enumerable.rangeTo(-3, 6).toArray(), [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]);
    deepEqual(Enumerable.rangeTo(2, -5).toArray(), [2, 1, 0, -1, -2, -3, -4, -5]);
    deepEqual(Enumerable.rangeTo(1, 5, 3).toArray(), [1, 4]);
    deepEqual(Enumerable.rangeTo(1, -5, 3).toArray(), [1, -2, -5]);
    deepEqual(Enumerable.rangeTo(1, -6, 3).toArray(), [1, -2, -5]);

    deepEqual(Enumerable.rangeTo(4, 4).toArray(), [4]);
    deepEqual(Enumerable.rangeTo(4, 4, 3).toArray(), [4]);
  });
});
test('rangeTo infers descending direction and includes the endpoint', () => {
  expect(Enumerable.rangeTo(5, 1, 2).toArray()).toEqual([5, 3, 1]);
});

test('rangeTo uses the absolute step value', () => {
  expect(Enumerable.rangeTo(1, 5, -2).toArray()).toEqual([1, 3, 5]);
});
