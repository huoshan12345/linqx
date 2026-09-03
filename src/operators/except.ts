import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function except<T, TCompare>(this: IEnumerable<T>, second: EnumerableInput<T>, compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const excluded = new Set([...toIterable(second)].map(compareSelector));
    const yielded = new Set<TCompare>();
    for (const element of source) {
      const key = compareSelector(element);
      if (!excluded.has(key) && !yielded.has(key)) { yielded.add(key); yield element; }
    }
  });
}
