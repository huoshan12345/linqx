import type { IEnumerable } from '../types.js';

export function firstOrDefault<T, TDefault>(
  this: IEnumerable<T>,
  predicateOrDefault?: ((element: T, index: number) => boolean) | TDefault,
  defaultValue?: TDefault,
): T | TDefault | undefined {
  const predicate = typeof predicateOrDefault === 'function'
    ? predicateOrDefault as (element: T, index: number) => boolean
    : undefined;
  const fallback = predicate ? defaultValue : predicateOrDefault as TDefault | undefined;
  let index = 0;

  for (const element of this) {
    if (!predicate || predicate(element, index++)) {
      return element;
    }
  }

  return fallback;
}
