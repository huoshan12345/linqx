import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Join", () => {
  test("join", function () {
    const math = { yamada: 100, tanaka: 80, yoshida: 94 };
    const english = { yamada: 73, yoshida: 26, tanaka: 99 };
    let actual: unknown = Enumerable.from(math)
      .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
        (o, i) => ({ Name: o.key, Math: o.value, English: i.value }))
      .toArray();
    let expected: unknown = [{ Name: "yamada", Math: 100, English: 73 },
    { Name: "tanaka", Math: 80, English: 99 },
    { Name: "yoshida", Math: 94, English: 26 }];
    expect(actual).toEqual(expected);

    actual = Enumerable.from(math)
      .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
        (o, i) => { return { Name: o.key, Math: o.value, English: i.value } ;})
      .toArray();

    expected = [{ Name: "yamada", Math: 100, English: 73 },
    { Name: "tanaka", Math: 80, English: 99 },
    { Name: "yoshida", Math: 94, English: 26 }];

    expect(actual).toEqual(expected);

    actual = Enumerable.from(math)
      .join(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
        (o) => ({ returnVal: o.key }))
      .toArray();

    expected = [{ returnVal: "yamada" }, { returnVal: "tanaka" }, { returnVal: "yoshida" }];

    expect(actual).toEqual(expected);
  });
});
test('join emits every matching pair for duplicate keys', () => {
  const result = Enumerable.from([{ id: 1, name: 'outer' }])
    .join(
      [{ id: 1, value: 'a' }, { id: 1, value: 'b' }],
      outer => outer.id,
      inner => inner.id,
      (outer, inner) => outer.name + inner.value,
    )
    .toArray();

  expect(result).toEqual(['outera', 'outerb']);
});

test('join omits unmatched outer elements and supports normalized keys', () => {
  const result = Enumerable.from(['A', 'missing'])
    .join(['a'], value => value, value => value, (outer, inner) => [outer, inner],
      value => value.toLowerCase())
    .toArray();

  expect(result).toEqual([['A', 'a']]);
});
