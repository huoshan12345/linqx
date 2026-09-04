import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('append places an element after the source', () => {
  expect(Enumerable.from([1, 2]).append(3).toArray()).toEqual([1, 2, 3]);
});

test('append creates a singleton sequence from an empty source', () => {
  expect(Enumerable.empty<string>().append('value').toArray()).toEqual(['value']);
});

test('append remains deferred and re-enumerates the source', () => {
  let enumerations = 0;
  const sequence = Enumerable.defer(() => {
    enumerations++;
    return Enumerable.make(1);
  }).append(2);

  expect(enumerations).toBe(0);
  expect(sequence.toArray()).toEqual([1, 2]);
  expect(sequence.toArray()).toEqual([1, 2]);
  expect(enumerations).toBe(2);
});
