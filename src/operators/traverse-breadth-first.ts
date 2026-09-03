import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function traverseBreadthFirst<T, TResult = T>(
  this: IEnumerable<T>,
  childrenSelector: (element: T) => IEnumerable<T>,
  resultSelector: (element: T, nestLevel: number) => TResult = (element => element as unknown as TResult),
): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* () {
    let level = 0;
    let current: Iterable<T> = source;
    while (true) {
      const next: T[] = [];
      let found = false;
      for (const element of current) {
        found = true;
        yield resultSelector(element, level);
        next.push(...childrenSelector(element));
      }
      if (!found) return;
      current = next;
      level++;
    }
  });
}
