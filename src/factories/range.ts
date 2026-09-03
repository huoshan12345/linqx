import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function range(start: number, count: number, step = 1): IEnumerable<number> {
  return fromGenerator(function* () { for (let i = 0; i < count; i++) yield start + i * step; });
}
