import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("flatten", function () {
    const array = [1, 31, [431, 41, 5], [1431, 43, [344, 3], 43], 43];
    const actual = Enumerable.from(array).flatten().toArray();
    deepEqual(actual, [1, 31, 431, 41, 5, 1431, 43, 344, 3, 43, 43]);
  });
});
test('flatten treats strings as scalar values', () => {
  expect(Enumerable.from<unknown>(['ab', ['cd']]).flatten().toArray()).toEqual(['ab', 'cd']);
});

test('flatten handles empty nested iterables', () => {
  expect(Enumerable.from<unknown>([[], [1, [], 2]]).flatten().toArray()).toEqual([1, 2]);
});
