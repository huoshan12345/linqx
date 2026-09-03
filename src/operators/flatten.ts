import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { isIterable } from '../internal/functions.js';

export function flatten<T>(this: IEnumerable<T>): IEnumerable<unknown> {
  const source = this;
  return fromGenerator(function* flat() {
    function* visit(value: unknown): Generator<unknown> {
      if (typeof value !== 'string' && isIterable(value)) {
        for (const child of value) yield* visit(child);
      } else {
        yield value;
      }
    }
    for (const element of source) yield* visit(element);
  });
}
