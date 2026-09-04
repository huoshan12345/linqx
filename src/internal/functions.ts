import type { Comparer } from '../types.js';

export const identity = <T>(value: T): T => value;

export function defaultComparer<T>(first: T, second: T): number {
  if (first === second) {
    return 0;
  }

  if (first == null) {
    return -1;
  }

  if (second == null) {
    return 1;
  }

  return first < second ? -1 : 1;
}

export function reverseComparer<T>(comparer: Comparer<T>): Comparer<T> {
  return (first, second) => -comparer(first, second);
}

export function isIterable(value: unknown): value is Iterable<unknown> {
  return value != null
    && typeof (value as Iterable<unknown>)[Symbol.iterator] === 'function';
}

export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return value != null && typeof (value as ArrayLike<unknown>).length === 'number';
}
