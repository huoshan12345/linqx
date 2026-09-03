import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, ok, strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("first", function () {
    equal(arraySequence.first(), 1);
    equal(arraySequence.first((value) => value >= 100), 100);

    try {
      arraySequence.first((value) => value === -1);
      ok(false);
    }
    catch (e) { ok(true); }

    try {
      emptySequence.first();
      ok(false);
    }
    catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("first", function () {
    let actual = Enumerable.range(1, 10).first();
    strictEqual(actual, 1);
    actual = Enumerable.range(1, 10).first((i) => i * 3 === 6);
    strictEqual(actual, 2);
  });
});
test('first stops enumerating after the first match', () => {
  const visited: number[] = [];

  const result = Enumerable.range(1, 5)
    .doAction(value => {
      visited.push(value);
    })
    .first(value => value > 2);

  expect(result).toBe(3);
  expect(visited).toEqual([1, 2, 3]);
});
