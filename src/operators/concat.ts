import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function concat<T>(
  this: IEnumerable<T>,
  ...sequences: EnumerableInput<T>[]
): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    yield* source;
    for (const sequence of sequences) {
      yield* toIterable(sequence);
    }
  });
}
