import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function unfold<T>(seed: T, func: (value: T) => T): IEnumerable<T> {
  return fromGenerator(function* () {
    let value = seed;

    while (true) {
      yield value;
      value = func(value);
    }
  });
}
