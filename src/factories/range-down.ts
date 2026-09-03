import type { IEnumerable } from '../types.js';
import { range } from './range.js';

export function rangeDown(start: number, count: number, step = 1): IEnumerable<number> { return range(start, count, -Math.abs(step)); }
