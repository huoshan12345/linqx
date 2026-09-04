import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Join", () => {
  test("groupJoin", function () {
    const array1 = [3, 3, 4, 5, 6];
    const array2 = [2, 4, 5, 6, 6];
    let actual = Enumerable.from(array1)
      .groupJoin(array2, (i) => i, (i) => i,
        function (outer, collection) {
          return {
            outer: outer,
            collection: collection.toArray()
          };
        })
      .toArray();
    let expected = [{ outer: 3, collection: [] },
    { outer: 3, collection: [] },
    { outer: 4, collection: [4] },
    { outer: 5, collection: [5] },
    { outer: 6, collection: [6, 6] }];
    expect(actual).toEqual(expected);

    actual = Enumerable.from(array1)
      .groupJoin(array2, (i) => i % 2 === 0, (i) => i % 2 === 0,
        function (outer, collection) {
          return {
            outer: outer,
            collection: collection.toArray()
          };
        })
      .toArray();
    expected = [{ outer: 3, collection: [5] },
    { outer: 3, collection: [5] },
    { outer: 4, collection: [2, 4, 6, 6] },
    { outer: 5, collection: [5] },
    { outer: 6, collection: [2, 4, 6, 6] }];
    expect(actual).toEqual(expected);
  });
});
test('groupJoin supplies an empty group for an unmatched outer element', () => {
  const result = Enumerable.from([1, 2])
    .groupJoin([2], value => value, value => value, (outer, inner) => [outer, inner.toArray()])
    .toArray();

  expect(result).toEqual([[1, []], [2, [2]]]);
});

test('groupJoin supports normalized comparison keys', () => {
  const result = Enumerable.from(['A'])
    .groupJoin(['a', 'A'], value => value, value => value, (_, inner) => inner.toArray(),
      value => value.toLowerCase())
    .toArray();

  expect(result).toEqual([['a', 'A']]);
});
