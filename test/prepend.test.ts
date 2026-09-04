import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('prepend places an element before the source', () => {
  expect(Enumerable.from([2, 3]).prepend(1).toArray()).toEqual([1, 2, 3]);
});

test('prepend creates a singleton sequence from an empty source', () => {
  expect(Enumerable.empty<string>().prepend('value').toArray()).toEqual(['value']);
});

test('prepend yields its element before enumerating the source', () => {
  let enumerations = 0;
  const sequence = Enumerable.defer(() => {
    enumerations++;
    return Enumerable.make(2);
  }).prepend(1);
  const iterator = sequence[Symbol.iterator]();

  expect(iterator.next()).toEqual({ value: 1, done: false });
  expect(enumerations).toBe(0);
  expect(iterator.next()).toEqual({ value: 2, done: false });
  expect(enumerations).toBe(1);
});
