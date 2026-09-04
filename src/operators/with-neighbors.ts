import type { IEnumerable, Neighbors } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function withNeighbors<T>(this: IEnumerable<T>): IEnumerable<Neighbors<T>> {
  const source = this;
  return fromGenerator(function* () {
    const iterator = source[Symbol.iterator]();
    let current = iterator.next();

    if (current.done) {
      return;
    }

    let previous: T | null = null;
    while (true) {
      const next = iterator.next();
      yield {
        prev: previous,
        item: current.value,
        next: next.done ? null : next.value,
      };

      if (next.done) {
        return;
      }

      previous = current.value;
      current = next;
    }
  });
}
