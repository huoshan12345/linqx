import type { IDisposableEnumerable, IEnumerable } from '../types.js';
import { MemoizedEnumerable } from '../core/memoized-enumerable.js';

export function memoize<T>(this: IEnumerable<T>): IDisposableEnumerable<T> {
  return new MemoizedEnumerable(this);
}
