import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Join", () => {
  test("leftJoin", function () {
    const math = { yamada: 100, tanaka: 80, yoshida: 94 };
    const english = { yamada: 73, tanaka: 99 };
    const actual = Enumerable.from(math)
      .leftJoin(Enumerable.from(english), (outer) => outer.key, (inner) => inner.key,
        (o, i) => ({ Name: o.key, Math: o.value, English: i === null ? null : i.value }))
      .toArray();
    const expected = [{ Name: "yamada", Math: 100, English: 73 },
    { Name: "tanaka", Math: 80, English: 99 },
    { Name: "yoshida", Math: 94, English: null }];
    deepEqual(actual, expected);

  });
});
test('leftJoin emits null for an unmatched inner element', () => {
  const result = Enumerable.from([1, 2])
    .leftJoin([2], value => value, value => value, (outer, inner) => [outer, inner])
    .toArray();

  expect(result).toEqual([[1, null], [2, 2]]);
});

test('leftJoin emits all matches and supports normalized keys', () => {
  const result = Enumerable.from(['A'])
    .leftJoin(['a', 'A'], value => value, value => value, (_, inner) => inner,
      value => value.toLowerCase())
    .toArray();

  expect(result).toEqual(['a', 'A']);
});
