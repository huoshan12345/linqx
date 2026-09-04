import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('toSet materializes distinct values in first-occurrence order', () => {
  expect([...Enumerable.from([2, 1, 2, 3]).toSet()]).toEqual([2, 1, 3]);
});

test('toSet uses native Set identity semantics for objects', () => {
  const first = { id: 1 };
  const second = { id: 1 };

  expect(Enumerable.from([first, first, second]).toSet().size).toBe(2);
});

test('toSet returns a new empty set for an empty source', () => {
  const first = Enumerable.empty<number>().toSet();
  const second = Enumerable.empty<number>().toSet();

  expect(first).toEqual(new Set());
  expect(first).not.toBe(second);
});
