import type { IEnumerable } from '../types.js';

export function lastOrDefault<T, TDefault>(
  this: IEnumerable<T>,
  predicateOrDefault?: ((element: T, index: number) => boolean) | TDefault,
  defaultValue?: TDefault,
): T | TDefault | undefined {
  const predicate = typeof predicateOrDefault === 'function'
    ? predicateOrDefault as (element: T, index: number) => boolean
    : undefined;
  const fallback = predicate ? defaultValue : predicateOrDefault as TDefault | undefined;
  let found = false;
  let result!: T;
  let index = 0;

  for (const element of this) {
    if (!predicate || predicate(element, index++)) {
      found = true;
      result = element;
    }
  }

  return found ? result : fallback;
}
