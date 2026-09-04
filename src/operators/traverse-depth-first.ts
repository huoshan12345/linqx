import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function traverseDepthFirst<T, TResult = T>(
  this: IEnumerable<T>,
  childrenSelector: (element: T) => IEnumerable<T>,
  resultSelector: (element: T, nestLevel: number) => TResult = (
    element => element as unknown as TResult
  ),
): IEnumerable<TResult> {
  const source = this;
  return fromGenerator(function* walk() {
    function* visit(elements: Iterable<T>, level: number): Generator<TResult> {
      for (const element of elements) {
        yield resultSelector(element, level);
        yield* visit(childrenSelector(element), level + 1);
      }
    }
    yield* visit(source, 0);
  });
}
