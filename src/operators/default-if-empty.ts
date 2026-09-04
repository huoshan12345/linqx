import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function defaultIfEmpty<T>(this: IEnumerable<T>, defaultValue?: T): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    let empty = true;
    for (const element of source) {
      empty = false;
      yield element;
    }

    if (empty) {
      yield defaultValue as T;
    }
  });
}
