import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function takeExceptLast<T>(this: IEnumerable<T>, count = 1): IEnumerable<T> {
  const source = this;
  return fromGenerator(function* () {
    if (count <= 0) {
      yield* source;
      return;
    }

    const queue: T[] = [];
    for (const element of source) {
      queue.push(element);

      if (queue.length > count) {
        yield queue.shift()!;
      }
    }
  });
}
