import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { isArrayLike, isIterable } from '../internal/functions.js';
import { toIterable } from '../internal/to-iterable.js';

export function alternate<T>(this: IEnumerable<T>, alternateValue: T | EnumerableInput<T>): IEnumerable<T> {
  const source = this;
  const values = isIterable(alternateValue) || isArrayLike(alternateValue)
    ? () => toIterable(alternateValue as EnumerableInput<T>)
    : () => [alternateValue as T];
  return fromGenerator(function* () {
    let first = true;
    for (const element of source) {
      if (!first) yield* values();
      first = false;
      yield element;
    }
  });
}
