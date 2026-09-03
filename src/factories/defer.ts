import type { IEnumerable } from '../types.js';
import { createEnumerable } from '../internal/create-enumerable.js';

export function defer<T>(factory: () => IEnumerable<T>): IEnumerable<T> { return createEnumerable(() => factory()[Symbol.iterator]()); }
