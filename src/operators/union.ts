import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function union<T, TCompare>(this: IEnumerable<T>, second: EnumerableInput<T>, compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    const seen = new Set<TCompare>();
    for (const element of [...source, ...toIterable(second)]) {
      const key = compareSelector(element);
      if (!seen.has(key)) { seen.add(key); yield element; }
    }
  });
}
