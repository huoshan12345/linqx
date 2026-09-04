import type { IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';
import { distinct } from './distinct.js';

export function distinctBy<T, TKey, TCompare = TKey>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  compareSelector: (key: TKey) => TCompare = identity as (key: TKey) => TCompare,
): IEnumerable<T> {
  return (distinct<T, TCompare>).call(
    this,
    element => compareSelector(keySelector(element)),
  );
}
