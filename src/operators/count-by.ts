import type { IEnumerable, KeyValuePair } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

export function countBy<T, TKey>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<KeyValuePair<TKey, number>> {
  const source = this;
  return fromGenerator(function* () {
    const entries = new Map<unknown, KeyValuePair<TKey, number>>();
    for (const element of source) {
      const key = keySelector(element);
      const comparisonKey = compareSelector(key);
      const entry = entries.get(comparisonKey);

      if (entry) {
        entry.value++;
      } else {
        entries.set(comparisonKey, { key, value: 1 });
      }
    }

    yield* entries.values();
  });
}
