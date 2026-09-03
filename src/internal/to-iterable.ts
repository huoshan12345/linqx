import type { EnumerableInput } from '../types.js';
import { isArrayLike, isIterable } from './functions.js';

export function toIterable<T>(source: EnumerableInput<T>): Iterable<T> {
  if (isIterable(source)) return source as Iterable<T>;
  if (isArrayLike(source)) {
    return (function* () {
      for (let index = 0; index < source.length; index++) yield source[index]!;
    })();
  }
  throw new TypeError('Value is not enumerable.');
}
