import type { IEnumerable } from '../types.js';

export function isEmpty<T>(this: IEnumerable<T>): boolean {
  const iterator = this[Symbol.iterator]();
  const result = iterator.next();
  if (!result.done) iterator.return?.();
  return Boolean(result.done);
}
