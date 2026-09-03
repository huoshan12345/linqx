import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("isEmpty", function () {
    const _ = Enumerable.range(1, 10).isEmpty();

    expect(_).toBe(false);
    expect(Enumerable.empty().isEmpty()).toBe(true);

    expect(Enumerable.from([]).isEmpty()).toBe(true);
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
