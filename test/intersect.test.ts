import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Set", () => {
  test("intersect", function () {
    let actual: unknown = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
      .intersect([4, 6, 2, 7, 8, 10, 11])
      .toArray();
    deepEqual(actual, [6, 4, 2]);
    actual = Enumerable.range(1, 10).select((value) => ({ test: value % 3 }))
      .intersect(Enumerable.range(1, 10).select((value) => ({ test: value % 2 })), (value) => value.test)
      .toArray();
    deepEqual(actual, [{ test: 1 }, { test: 0 }]);
  });
});
test('intersect emits each matching comparison key once', () => {
  expect(Enumerable.from([1, 1, 2, 3, 3]).intersect([1, 3, 3]).toArray()).toEqual([1, 3]);
});

test('intersect supports projected comparison keys', () => {
  expect(Enumerable.from([{ id: 1 }, { id: 2 }])
    .intersect([{ id: 2 }], value => value.id)
    .toArray())
    .toEqual([{ id: 2 }]);
});
