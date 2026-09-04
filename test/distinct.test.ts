import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("distinct", function () {
    let actual: unknown = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).distinct().toArray();
    expect(actual).toEqual([1, 3, 5, 6, 4, 2, 9]);
    actual = Enumerable.range(1, 10).select((value) => ({ test: value % 2 })).distinct((value) => value.test).toArray();
    expect(actual).toEqual([{ test: 1 }, { test: 0 }]);
  });
});
test('distinct preserves the first occurrence order', () => {
  expect(Enumerable.from([3, 1, 3, 2, 1]).distinct().toArray()).toEqual([3, 1, 2]);
});

test('distinct compares projected keys', () => {
  expect(Enumerable.from([{ id: 1, name: 'first' }, { id: 1, name: 'second' }])
    .distinct(value => value.id)
    .map(value => value.name))
    .toEqual(['first']);
});
