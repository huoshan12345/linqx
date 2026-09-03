import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("all", function () {
    const seq = Enumerable.range(1, 10);
    expect(seq.all((i) => i % 2 === 0)).toBe(false);
    expect(seq.all((i) => i <= 10)).toBe(true);
  });
});
test('all returns true for an empty sequence', () => {
  expect(Enumerable.empty<number>().all(() => false)).toBe(true);
});

test('all stops evaluating after the first rejected element', () => {
  const visited: number[] = [];

  const result = Enumerable.range(1, 5).all(value => {
    visited.push(value);
    return value < 3;
  });

  expect(result).toBe(false);
  expect(visited).toEqual([1, 2, 3]);
});
