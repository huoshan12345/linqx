import type { IEnumerable } from '../types.js';

export function elementAt<T>(this: IEnumerable<T>, index: number): T {
  let current = 0;
  for (const element of this) if (current++ === index) return element;
  throw new Error('Index is out of range.');
}
