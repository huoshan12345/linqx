import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("alternate", function () {
    // single value
    expect(Enumerable.empty().alternate(-1).toArray()).toEqual([]);

    expect(Enumerable.from([1]).alternate(-1).toArray()).toEqual([1]);
    expect(Enumerable.from([1, 2]).alternate(-1).toArray()).toEqual([1, -1, 2]);
    expect(Enumerable.range(1, 5).alternate(-1).toArray()).toEqual([1, -1, 2, -1, 3, -1, 4, -1, 5]);
    expect(Enumerable.range(1, 6).alternate(-1).toArray()).toEqual([1, -1, 2, -1, 3, -1, 4, -1, 5, -1, 6]);

    // multiple, array
    expect(Enumerable.empty().alternate([-1, -2]).toArray()).toEqual([]);
    expect(Enumerable.from([1]).alternate([-1, -2]).toArray()).toEqual([1]);
    expect(Enumerable.from([1, 2]).alternate([-1, -2]).toArray()).toEqual([1, -1, -2, 2]);
    expect(Enumerable.range(1, 5).alternate([-1, -2]).toArray()).toEqual([1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
    expect(Enumerable.range(1, 6).alternate([-1, -2]).toArray()).toEqual([1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);

    // multiple, enumerable
    const seq = Enumerable.rangeTo(-1, -2);
    expect(Enumerable.empty().alternate(seq).toArray()).toEqual([]);
    expect(Enumerable.from([1]).alternate(seq).toArray()).toEqual([1]);
    expect(Enumerable.from([1, 2]).alternate(seq).toArray()).toEqual([1, -1, -2, 2]);
    expect(Enumerable.range(1, 5).alternate(seq).toArray()).toEqual([1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
    expect(Enumerable.range(1, 6).alternate(seq).toArray()).toEqual([1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);
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
