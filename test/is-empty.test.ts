import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Set", () => {
  test("isEmpty", function () {
    const _ = Enumerable.range(1, 10).isEmpty();

    strictEqual(_, false);
    strictEqual(Enumerable.empty().isEmpty(), true);

    strictEqual(Enumerable.from([]).isEmpty(), true);
  });
});
test('isEmpty returns true for an empty sequence', () => {
  expect(Enumerable.empty<number>().isEmpty()).toBe(true);
});

test('isEmpty reads only the first element from a non-empty sequence', () => {
  const visited: number[] = [];
  const result = Enumerable.range(1, 5).doAction(value => {
    visited.push(value);
  }).isEmpty();

  expect(result).toBe(false);
  expect(visited).toEqual([1]);
});
