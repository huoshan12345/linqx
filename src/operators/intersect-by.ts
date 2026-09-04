import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function intersectBy<T, TKey, TCompare = TKey>(
  this: IEnumerable<T>,
  second: EnumerableInput<TKey>,
  keySelector: (element: T) => TKey,
  compareSelector: (key: TKey) => TCompare = identity as (key: TKey) => TCompare,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const included = new Set<TCompare>();
    for (const key of toIterable(second)) {
      included.add(compareSelector(key));
    }

    for (const element of source) {
      const key = compareSelector(keySelector(element));
      if (included.delete(key)) {
        yield element;
      }
    }
  });
}
