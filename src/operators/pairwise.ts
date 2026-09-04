import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function pairwise<T, TResult>(
  this: IEnumerable<T>,
  selector: (prev: T, current: T) => TResult,
): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    let hasPrevious = false;
    let previous!: T;

    for (const current of source) {
      if (hasPrevious) {
        yield selector(previous, current);
      }

      previous = current;
      hasPrevious = true;
    }
  });
}
