import type { IEnumerable } from '../types.js';

export function aggregate<T, TAccumulate, TResult>(
  this: IEnumerable<T>,
  seedOrFunc: TAccumulate | ((prev: T, current: T) => T),
  func?: (prev: TAccumulate, current: T) => TAccumulate,
  resultSelector?: (last: TAccumulate) => TResult,
): T | TAccumulate | TResult {
  if (typeof seedOrFunc === 'function' && func === undefined) {
    const iterator = this[Symbol.iterator]();
    const first = iterator.next();
    if (first.done) throw new Error('Sequence contains no elements.');
    let result = first.value;
    for (let next = iterator.next(); !next.done; next = iterator.next()) result = (seedOrFunc as (prev: T, current: T) => T)(result, next.value);
    return result;
  }
  let result = seedOrFunc as TAccumulate;
  for (const element of this) result = func!(result, element);
  return resultSelector ? resultSelector(result) : result;
}
