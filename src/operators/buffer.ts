import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function buffer<T>(this: IEnumerable<T>, count: number): IEnumerable<T[]> {
  if (count <= 0) {
    throw new RangeError('count must be greater than zero.');
  }

  const source = this;
  return fromGenerator(function* () {
    let values: T[] = [];

    for (const element of source) {
      values.push(element);

      if (values.length === count) {
        yield values;
        values = [];
      }
    }

    if (values.length > 0) {
      yield values;
    }
  });
}
