import type { IEnumerable } from '../types.js';

export function elementAtOrDefault<T>(
  this: IEnumerable<T>,
  index: number,
  defaultValue?: T,
): T | undefined {
  if (index < 0) {
    return defaultValue;
  }

  let current = 0;
  for (const element of this) {
    if (current++ === index) {
      return element;
    }
  }

  return defaultValue;
}
