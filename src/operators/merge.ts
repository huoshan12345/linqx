import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function merge<T>(this: IEnumerable<T>, ...others: EnumerableInput<T>[]): IEnumerable<T> {
  const sources: EnumerableInput<T>[] = [this, ...others];
  return fromGenerator(function* () {
    const iterators = sources.map(source => toIterable(source)[Symbol.iterator]());
    let active = iterators;
    while (active.length > 0) {
      const next: Iterator<T>[] = [];
      for (const iterator of active) {
        const result = iterator.next();
        if (!result.done) {
          yield result.value;
          next.push(iterator);
        }
      }
      active = next;
    }
  });
}
