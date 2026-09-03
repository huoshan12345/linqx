import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function toInfinity(start = 0, step = 1): IEnumerable<number> { return fromGenerator(function* () { for (let value = start; ; value += step) yield value; }); }
