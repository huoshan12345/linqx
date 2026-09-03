import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function make<T>(element: T): IEnumerable<T> { return fromGenerator(function* () { yield element; }); }
