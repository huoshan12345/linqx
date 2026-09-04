import type { EnumerableInput, IEnumerable } from '../types.js';
import { identity } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function sequenceEqual<T, TCompare>(
  this: IEnumerable<T>,
  second: EnumerableInput<T>,
  compareSelector: (element: T) => TCompare = identity as (element: T) => TCompare,
): boolean {
  const left = this[Symbol.iterator]();
  const right = toIterable(second)[Symbol.iterator]();

  while (true) {
    const leftResult = left.next();
    const rightResult = right.next();

    if (leftResult.done || rightResult.done) {
      return Boolean(leftResult.done) === Boolean(rightResult.done);
    }

    if (compareSelector(leftResult.value) !== compareSelector(rightResult.value)) {
      return false;
    }
  }
}
