import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function scan<T, TAccumulate>(
  this: IEnumerable<T>,
  seedOrFunc: TAccumulate | ((prev: T, current: T) => T),
  optionalFunc?: (prev: TAccumulate, current: T) => TAccumulate,
): IEnumerable<T | TAccumulate> {
  const source = this;
  return fromGenerator(function* () {
    if (optionalFunc) {
      let accumulator = seedOrFunc as TAccumulate;
      yield accumulator;
      for (const element of source) {
        accumulator = optionalFunc(accumulator, element);
        yield accumulator;
      }
      return;
    }

    const func = seedOrFunc as (prev: T, current: T) => T;
    let hasAccumulator = false;
    let accumulator!: T;
    for (const element of source) {
      accumulator = hasAccumulator ? func(accumulator, element) : element;
      hasAccumulator = true;
      yield accumulator;
    }
  });
}
