import type { IEnumerable } from '../types.js';

export function toJSONString<T>(this: IEnumerable<T>, replacer?: ((key: string, value: unknown) => unknown) | (string | number)[], space?: string | number): string {
  const values = Array.from(this);
  return Array.isArray(replacer)
    ? JSON.stringify(values, replacer, space)
    : JSON.stringify(values, replacer, space);
}
