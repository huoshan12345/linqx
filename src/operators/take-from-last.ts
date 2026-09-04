import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function takeFromLast<T>(this: IEnumerable<T>, count: number): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    if (count <= 0) {
      return;
    }

    const queue: T[] = [];
    for (const element of source) {
      queue.push(element);

      if (queue.length > count) {
        queue.shift();
      }
    }

    yield* queue;
  });
}
