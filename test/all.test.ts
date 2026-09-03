import { describe } from 'vitest';
import Enumerable from './sut.js';
import { ok, test } from './test-utils.js';

describe("Set", () => {
  test("all", function () {
    const seq = Enumerable.range(1, 10);
    ok(!seq.all((i) => i % 2 === 0));
    ok(seq.all((i) => i <= 10));
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
