import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("union", function () {
    let actual: unknown = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
      .union([4, 6, 2, 7, 8, 10, 11])
      .toArray();
    expect(actual).toEqual([1, 3, 5, 6, 4, 2, 9, 7, 8, 10, 11]);
    actual = Enumerable.range(1, 3).select((value) => ({ test: value }))
      .union(Enumerable.range(2, 3).select((value) => ({ test: value })), (value) => value.test)
      .toArray();
    expect(actual).toEqual([{ test: 1 }, { test: 2 }, { test: 3 }, { test: 4 }]);
  });
});
test('union removes duplicates while preserving first occurrence order', () => {
  expect(Enumerable.from([2, 1, 2]).union([1, 3]).toArray()).toEqual([2, 1, 3]);
});

test('union supports projected comparison keys', () => {
  expect(Enumerable.from([{ id: 1, source: 'left' }])
    .union([{ id: 1, source: 'right' }, { id: 2, source: 'right' }], value => value.id)
    .map(value => value.source))
    .toEqual(['left', 'right']);
});
