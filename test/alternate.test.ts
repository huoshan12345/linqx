import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Set", () => {
  test("alternate", function () {
    // single value
    deepEqual(Enumerable.empty().alternate(-1).toArray(), []);

    deepEqual(Enumerable.from([1]).alternate(-1).toArray(), [1]);
    deepEqual(Enumerable.from([1, 2]).alternate(-1).toArray(), [1, -1, 2]);
    deepEqual(Enumerable.range(1, 5).alternate(-1).toArray(), [1, -1, 2, -1, 3, -1, 4, -1, 5]);
    deepEqual(Enumerable.range(1, 6).alternate(-1).toArray(), [1, -1, 2, -1, 3, -1, 4, -1, 5, -1, 6]);

    // multiple, array
    deepEqual(Enumerable.empty().alternate([-1, -2]).toArray(), []);
    deepEqual(Enumerable.from([1]).alternate([-1, -2]).toArray(), [1]);
    deepEqual(Enumerable.from([1, 2]).alternate([-1, -2]).toArray(), [1, -1, -2, 2]);
    deepEqual(Enumerable.range(1, 5).alternate([-1, -2]).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
    deepEqual(Enumerable.range(1, 6).alternate([-1, -2]).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);

    // multiple, enumerable
    const seq = Enumerable.rangeTo(-1, -2);
    deepEqual(Enumerable.empty().alternate(seq).toArray(), []);
    deepEqual(Enumerable.from([1]).alternate(seq).toArray(), [1]);
    deepEqual(Enumerable.from([1, 2]).alternate(seq).toArray(), [1, -1, -2, 2]);
    deepEqual(Enumerable.range(1, 5).alternate(seq).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
    deepEqual(Enumerable.range(1, 6).alternate(seq).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);
  });
});
test('alternate inserts an entire sequence between source elements', () => {
  expect(Enumerable.from([1, 2, 3]).alternate([8, 9]).toArray())
    .toEqual([1, 8, 9, 2, 8, 9, 3]);
});

test('alternate does not add values around an empty or single-element source', () => {
  expect(Enumerable.empty<number>().alternate(0).toArray()).toEqual([]);
  expect(Enumerable.make(1).alternate(0).toArray()).toEqual([1]);
});
