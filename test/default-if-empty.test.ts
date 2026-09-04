import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("defaultIfEmpty", function () {
    let actual = Enumerable.range(1, 10).defaultIfEmpty(199).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.empty<number>().defaultIfEmpty(199).toArray();
    expect(actual).toEqual([199]);
  });
});
test('defaultIfEmpty leaves a non-empty sequence unchanged', () => {
  expect(Enumerable.from([1, 2]).defaultIfEmpty(9).toArray()).toEqual([1, 2]);
});

test('defaultIfEmpty emits undefined when no fallback is supplied', () => {
  expect(Enumerable.empty<number>().defaultIfEmpty().toArray()).toEqual([undefined]);
});
