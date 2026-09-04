import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('takeLast returns the requested suffix in source order', () => {
  expect(Enumerable.rangeTo(1, 5).takeLast(2).toArray()).toEqual([4, 5]);
});

test('takeLast returns the complete source when count exceeds its length', () => {
  expect(Enumerable.from([1, 2]).takeLast(10).toArray()).toEqual([1, 2]);
});

test('takeLast returns an empty sequence for non-positive counts', () => {
  expect(Enumerable.from([1, 2]).takeLast(0).toArray()).toEqual([]);
  expect(Enumerable.from([1, 2]).takeLast(-1).toArray()).toEqual([]);
});
