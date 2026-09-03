import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function insert<T>(
  this: IEnumerable<T>,
  index: number,
  second: EnumerableInput<T>,
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let current = 0;
    let inserted = false;
    for (const element of source) {
      if (!inserted && current++ === index) {
        yield* toIterable(second);
        inserted = true;
      }
      yield element;
    }

    if (!inserted) {
      yield* toIterable(second);
    }
  });
}
