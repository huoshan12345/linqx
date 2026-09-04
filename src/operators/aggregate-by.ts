import type { IEnumerable, KeyValuePair } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

export function aggregateBy<T, TKey, TAccumulate>(
  this: IEnumerable<T>,
  keySelector: (element: T) => TKey,
  seed: TAccumulate,
  accumulator: (accumulate: TAccumulate, element: T) => TAccumulate,
  compareSelector: (key: TKey) => unknown = identity,
): IEnumerable<KeyValuePair<TKey, TAccumulate>> {
  const source = this;
  return fromGenerator(function* () {
    const entries = new Map<unknown, KeyValuePair<TKey, TAccumulate>>();
    for (const element of source) {
      const key = keySelector(element);
      const comparisonKey = compareSelector(key);
      const entry = entries.get(comparisonKey);

      if (entry) {
        entry.value = accumulator(entry.value, element);
      } else {
        entries.set(comparisonKey, {
          key,
          value: accumulator(seed, element),
        });
      }
    }

    yield* entries.values();
  });
}
