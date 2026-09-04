import type { EnumerableInput, IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';
import { union } from './union.js';

export function unionBy<T, TKey, TCompare = TKey>(
  this: IEnumerable<T>,
  second: EnumerableInput<T>,
  keySelector: (element: T) => TKey,
  compareSelector: (key: TKey) => TCompare = identity as (key: TKey) => TCompare,
): IEnumerable<T> {
  return (union<T, TCompare>).call(
    this,
    second,
    element => compareSelector(keySelector(element)),
  );
}
