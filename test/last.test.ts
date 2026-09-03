import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, ok, strictEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("last", function () {
    equal(arraySequence.last(), 10000);
    equal(arraySequence.last((value) => value <= 500), 100);

    try {
      arraySequence.last((value) => value === -1);
      ok(false);
    }
    catch (e) { ok(true); }

    try {
      emptySequence.last();
      ok(false);
    }
    catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("last", function () {
    let actual = Enumerable.range(1, 10).last();
    strictEqual(actual, 10);

    actual = Enumerable.range(1, 10).last((i) => i < 6);
    strictEqual(actual, 5);
  });
});
test('last evaluates the complete sequence before returning the final match', () => {
  const visited: number[] = [];
  const result = Enumerable.range(1, 4).doAction(value => {
    visited.push(value);
  }).last(value => value < 3);

  expect(result).toBe(2);
  expect(visited).toEqual([1, 2, 3, 4]);
});
