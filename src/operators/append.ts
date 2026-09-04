import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function append<T>(this: IEnumerable<T>, element: T): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    yield* source;
    yield element;
  });
}
