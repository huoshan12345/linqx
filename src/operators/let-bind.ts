import type { EnumerableInput, IEnumerable } from '../types.js';
import { createEnumerable } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function letBind<T, TResult>(this: IEnumerable<T>, func: (source: IEnumerable<T>) => EnumerableInput<TResult>): IEnumerable<TResult> {
  const source = this;
  return createEnumerable(() => toIterable(func(source))[Symbol.iterator]());
}
