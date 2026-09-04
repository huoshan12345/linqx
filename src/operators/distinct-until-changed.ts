import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

export function distinctUntilChanged<T, TCompare>(
  this: IEnumerable<T>,
  compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let initialized = false;
    let previous!: TCompare;
    for (const element of source) {
      const key = compareSelector(element);
      if (!initialized || key !== previous) {
        initialized = true;
        previous = key;
        yield element;
      }
    }
  });
}
