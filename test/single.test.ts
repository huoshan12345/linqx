import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("single", function () {
    let actual = Enumerable.range(1, 1).single();
    strictEqual(actual, 1);

    actual = Enumerable.range(1, 10).single((i) => i === 6);
    strictEqual(actual, 6);
  });
});
test('single rejects an empty sequence and a missing match', () => {
  expect(() => Enumerable.empty<number>().single()).toThrow('Sequence contains no matching element.');
  expect(() => Enumerable.range(1, 3).single(value => value > 9))
    .toThrow('Sequence contains no matching element.');
});

test('single rejects more than one matching element', () => {
  expect(() => Enumerable.range(1, 3).single(value => value > 1))
    .toThrow('Sequence contains more than one matching element.');
});
