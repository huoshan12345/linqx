import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function exceptBy<T, TKey, TCompare = TKey>(
  this: IEnumerable<T>,
  second: EnumerableInput<TKey>,
  keySelector: (element: T) => TKey,
  compareSelector: (key: TKey) => TCompare = identity as (key: TKey) => TCompare,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const excluded = new Set<TCompare>();
    for (const key of toIterable(second)) {
      excluded.add(compareSelector(key));
    }

    const yielded = new Set<TCompare>();
    for (const element of source) {
      const key = compareSelector(keySelector(element));
      if (!excluded.has(key) && !yielded.has(key)) {
        yielded.add(key);
        yield element;
      }
    }
  });
}
