import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Set", () => {
  test("except", function () {
    let actual: unknown = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
      .except([4, 6, 2, 7, 8, 10, 11])
      .toArray();
    deepEqual(actual, [1, 3, 5, 9]);
    actual = Enumerable.range(1, 10).select((value) => ({ test: value % 3 }))
      .except(Enumerable.range(1, 10).select((value) => ({ test: value % 2 })), (value) => value.test)
      .toArray();
    deepEqual(actual, [{ test: 2 }]);
  });
});
test('except removes duplicates from its output', () => {
  expect(Enumerable.from([1, 1, 2, 3, 3]).except([2]).toArray()).toEqual([1, 3]);
});

test('except compares projected keys', () => {
  const source = [{ id: 1 }, { id: 2 }];

  expect(Enumerable.from(source).except([{ id: 1 }], value => value.id).toArray())
    .toEqual([{ id: 2 }]);
});
