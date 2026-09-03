import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

export function distinct<T, TCompare>(this: IEnumerable<T>, compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const seen = new Set<TCompare>();
    for (const element of source) {
      const key = compareSelector(element);
      if (!seen.has(key)) { seen.add(key); yield element; }
    }
  });
}
