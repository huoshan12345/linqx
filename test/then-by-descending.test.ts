import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

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

  test("thenByDescending", function () {
    actual = Enumerable.from(list)
      .orderByDescending((l) => l.a)
      .thenByDescending((l) => l.b)
      .thenByDescending((l) => l.c)
      .toArray();
    expected = [
      { a: 7, b: 3, c: 2 },
      { a: 6, b: 6, c: 3 },
      { a: 4, b: 4, c: 5 },
      { a: 4, b: 4, c: 3 },
      { a: 2, b: 4, c: 1 },
      { a: 2, b: 3, c: 7 }
    ];
    expect(actual).toEqual(expected);

    actual = Enumerable.from(strlist)
      .orderByDescending((l) => l.a)
      .thenByDescending((l) => l.b)
      .thenByDescending((l) => l.c)
      .toArray();
    expected = [
      { a: "z", b: "e", c: "e" },
      { a: "n", b: "d", c: "q" },
      { a: "n", b: "d", c: "o" },
      { a: "a", b: "z", c: "b" },
      { a: "a", b: "c", c: "k" }
    ];
    expect(actual).toEqual(expected);
  });
});
test('thenByDescending orders equal primary keys by a descending secondary key', () => {
  const values = [
    { group: 1, value: 1 },
    { group: 2, value: 1 },
    { group: 1, value: 3 },
    { group: 1, value: 2 },
  ];

  expect(Enumerable.from(values).orderBy(item => item.group).thenByDescending(item => item.value)
    .map(item => item.value))
    .toEqual([3, 2, 1, 1]);
});

test('thenByDescending preserves order when all keys compare equal', () => {
  expect(Enumerable.from(['first', 'second']).orderBy(() => 0).thenByDescending(() => 0).toArray())
    .toEqual(['first', 'second']);
});
