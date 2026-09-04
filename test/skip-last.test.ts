import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('skipLast omits the requested suffix', () => {
  expect(Enumerable.rangeTo(1, 5).skipLast(2).toArray()).toEqual([1, 2, 3]);
});

test('skipLast returns an empty sequence when count reaches the source length', () => {
  expect(Enumerable.from([1, 2]).skipLast(2).toArray()).toEqual([]);
  expect(Enumerable.from([1, 2]).skipLast(10).toArray()).toEqual([]);
});

test('skipLast treats non-positive counts as zero', () => {
  expect(Enumerable.from([1, 2]).skipLast(0).toArray()).toEqual([1, 2]);
  expect(Enumerable.from([1, 2]).skipLast(-1).toArray()).toEqual([1, 2]);
});
