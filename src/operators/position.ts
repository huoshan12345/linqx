import type { IEnumerable, Positioned } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function position<T>(this: IEnumerable<T>): IEnumerable<Positioned<T>> {
  const source = this;
  return fromGenerator(function* () {
    const iterator = source[Symbol.iterator]();
    let current = iterator.next();

    if (current.done) {
      return;
    }

    let index = 0;
    while (true) {
      const next = iterator.next();
      yield {
        index,
        item: current.value,
        isFirst: index === 0,
        isLast: Boolean(next.done),
      };

      if (next.done) {
        return;
      }

      current = next;
      index++;
    }
  });
}
