import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function selectMany<T, TCollection, TResult = TCollection>(
  this: IEnumerable<T>,
  collectionSelector: (element: T, index: number) => EnumerableInput<TCollection>,
  resultSelector?: (outer: T, inner: TCollection) => TResult,
): IEnumerable<TCollection | TResult> {
  const source = this;
  return fromGenerator(function* () {
    let index = 0;
    for (const outer of source) {
      for (const inner of toIterable(collectionSelector(outer, index++))) {
        yield resultSelector ? resultSelector(outer, inner) : inner;
      }
    }
  });
}
