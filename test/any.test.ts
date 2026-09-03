import { describe } from 'vitest';
import Enumerable from './sut.js';
import { ok, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("any", function () {
    ok(arraySequence.any());
    ok(!emptySequence.any());
    ok(arraySequence.any((value) => value === 100));
    ok(!emptySequence.any((value) => value === 2));
  });
});

describe("Set", () => {
  test("any", function () {
    const seq = Enumerable.range(1, 10);
    const empty = Enumerable.empty();
    ok(seq.any());
    ok(!empty.any());
    ok(seq.any((value) => value === 5));
    ok(!seq.any((value) => value === 100));
  });
});
test('any stops evaluating after the first accepted element', () => {
  const visited: number[] = [];

  const result = Enumerable.range(1, 5).any(value => {
    visited.push(value);
    return value === 3;
  });

  expect(result).toBe(true);
  expect(visited).toEqual([1, 2, 3]);
});
