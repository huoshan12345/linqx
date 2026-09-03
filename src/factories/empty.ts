import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function empty<T>(): IEnumerable<T> { return fromGenerator(function* () {}); }
