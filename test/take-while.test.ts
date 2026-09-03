import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Paging", () => {
  test("takeWhile", function () {
    let actual = Enumerable.range(1, 10).takeWhile((i) => i < 8).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7]);

    actual = Enumerable.range(1, 10).takeWhile((_, i) => i < 8).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
test('takeWhile passes zero-based source indexes', () => {
  expect(Enumerable.from([10, 20, 30]).takeWhile((_, index) => index < 2).toArray())
    .toEqual([10, 20]);
});

test('takeWhile stops evaluating after the first rejection', () => {
  const visited: number[] = [];
  const result = Enumerable.range(1, 5).takeWhile(value => {
    visited.push(value);
    return value < 3;
  }).toArray();

  expect(result).toEqual([1, 2]);
  expect(visited).toEqual([1, 2, 3]);
});
