import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("scan", function () {
    let actual = Enumerable.range(1, 10).scan((a, b) => a + b).toArray();
    deepEqual(actual, [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]);
    const seed = 100;
    actual = Enumerable.range(1, 10).scan(seed, (a, b) => a + b).toArray();
    deepEqual(actual, [100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 155]);
  });
});
test('scan without a seed uses the first source element as its first result', () => {
  expect(Enumerable.from([1, 2, 3]).scan((sum, value) => sum + value).toArray())
    .toEqual([1, 3, 6]);
});

test('scan with a seed emits the seed even for an empty source', () => {
  expect(Enumerable.empty<number>().scan(10, (sum, value) => sum + value).toArray())
    .toEqual([10]);
});
