import type { EnumerableInput, IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function sequenceEqual<T, TCompare>(this: IEnumerable<T>, second: EnumerableInput<T>, compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare): boolean {
  const left = this[Symbol.iterator]();
  const right = toIterable(second)[Symbol.iterator]();
  while (true) {
    const a = left.next();
    const b = right.next();
    if (a.done || b.done) return Boolean(a.done) === Boolean(b.done);
    if (compareSelector(a.value) !== compareSelector(b.value)) return false;
  }
}
