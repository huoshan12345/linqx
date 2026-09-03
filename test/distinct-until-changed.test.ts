import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Set", () => {
  test("distinctUntilChanged", function () {
    deepEqual(Enumerable.from([9, 1, 3, 5, 7, 7, 7, 3, 4, 2, 2, 9]).distinctUntilChanged().toArray(), [9, 1, 3, 5, 7, 3, 4, 2, 9]);
    deepEqual(Enumerable.from([1, 3, 3, 3, 1, 2, 6, 3, 5, 1])
      .select((value) => ({ test: value }))
      .distinctUntilChanged((value) => value.test).toArray(),
      [{ test: 1 }, { test: 3 }, { test: 1 }, { test: 2 }, { test: 6 }, { test: 3 }, { test: 5 }, { test: 1 }]);

    deepEqual(Enumerable.from([1]).distinctUntilChanged().toArray(), [1]);
    deepEqual(Enumerable.from([1, 1]).distinctUntilChanged().toArray(), [1]);
    deepEqual(Enumerable.from([1, 2]).distinctUntilChanged().toArray(), [1, 2]);
  });
});
test('distinctUntilChanged retains equal values separated by another value', () => {
  expect(Enumerable.from([1, 1, 2, 1, 1]).distinctUntilChanged().toArray())
    .toEqual([1, 2, 1]);
});

test('distinctUntilChanged compares projected keys', () => {
  expect(Enumerable.from(['a', 'A', 'b', 'B']).distinctUntilChanged(value => value.toLowerCase()).toArray())
    .toEqual(['a', 'b']);
});
