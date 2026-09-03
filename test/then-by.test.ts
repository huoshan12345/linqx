import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Ordering", () => {
  let expected, actual;

  const list = [
    { a: 2, b: 4, c: 1 },
    { a: 2, b: 3, c: 7 },
    { a: 6, b: 6, c: 3 },
    { a: 4, b: 4, c: 5 },
    { a: 7, b: 3, c: 2 },
    { a: 4, b: 4, c: 3 }
  ];

  const strlist = [
    { a: "a", b: "z", c: "b" },
    { a: "z", b: "e", c: "e" },
    { a: "n", b: "d", c: "q" },
    { a: "a", b: "c", c: "k" },
    { a: "n", b: "d", c: "o" }
  ];

  test("thenBy", function () {
    actual = Enumerable.from(list)
      .orderBy((l) => l.a)
      .thenBy((l) => l.b)
      .thenBy((l) => l.c)
      .toArray();
    expected = [
      { a: 2, b: 3, c: 7 },
      { a: 2, b: 4, c: 1 },
      { a: 4, b: 4, c: 3 },
      { a: 4, b: 4, c: 5 },
      { a: 6, b: 6, c: 3 },
      { a: 7, b: 3, c: 2 }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(strlist)
      .orderBy((l) => l.a)
      .thenBy((l) => l.b)
      .thenBy((l) => l.c)
      .toArray();
    expected = [
      { a: "a", b: "c", c: "k" },
      { a: "a", b: "z", c: "b" },
      { a: "n", b: "d", c: "o" },
      { a: "n", b: "d", c: "q" },
      { a: "z", b: "e", c: "e" }
    ];
    deepEqual(actual, expected);

    actual = Enumerable.from(strlist)
      .orderBy(l => l.a)
      .thenBy(l => l, (x, y) => x.b < y.b ? -1 : x.b > y.b ? 1 : x.c < y.c ? -1 : +(x.c > y.c))
      .toArray();

    deepEqual(actual, expected);
  });
});
test('thenBy orders equal primary keys by an ascending secondary key', () => {
  const values = [
    { group: 1, value: 3 },
    { group: 2, value: 1 },
    { group: 1, value: 1 },
    { group: 1, value: 2 },
  ];

  expect(Enumerable.from(values).orderBy(item => item.group).thenBy(item => item.value)
    .map(item => item.value))
    .toEqual([1, 2, 3, 1]);
});

test('thenBy supports a custom comparer', () => {
  expect(Enumerable.from(['aa', 'b', 'ccc']).orderBy(() => 0)
    .thenBy(value => value, (left, right) => right.length - left.length)
    .toArray())
    .toEqual(['ccc', 'aa', 'b']);
});
