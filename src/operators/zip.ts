import type { EnumerableInput, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { toIterable } from '../internal/to-iterable.js';

export function zip<T, TResult>(this: IEnumerable<T>, ...params: unknown[]): IEnumerable<TResult> {
  if (params.length < 2) throw new TypeError('zip requires at least one sequence and a result selector.');
  const resultSelector = params[params.length - 1];
  if (typeof resultSelector !== 'function') throw new TypeError('The final zip argument must be a function.');
  const sources = [this as EnumerableInput<unknown>, ...params.slice(0, -1) as EnumerableInput<unknown>[]];
  return fromGenerator(function* () {
    const iterators = sources.map(source => toIterable(source)[Symbol.iterator]());
    let index = 0;
    while (true) {
      const results = iterators.map(iterator => iterator.next());
      if (results.some(result => result.done)) return;
      yield (resultSelector as (...values: unknown[]) => TResult)(...results.map(result => result.value), index++);
    }
  });
}
