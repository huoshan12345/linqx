import type { IEnumerable } from '../types.js';
import { createEnumerable, fromGenerator } from '../internal/create-enumerable.js';
import { isArrayLike, isIterable } from '../internal/functions.js';

export function from(): IEnumerable<unknown>;
export function from(source: number): IEnumerable<number>;
export function from(source: boolean): IEnumerable<boolean>;
export function from(source: string): IEnumerable<string>;
export function from<T>(source: Iterable<T> | Iterator<T> | ArrayLike<T> | (() => Iterable<T> | Iterator<T>)): IEnumerable<T>;
export function from<TKey extends PropertyKey, TValue>(source: Record<TKey, TValue>): IEnumerable<{ key: TKey; value: TValue }>;
export function from<T>(source?: T | Iterable<T> | Iterator<T> | ArrayLike<T> | (() => Iterable<T> | Iterator<T>)): IEnumerable<T> {
  if (source == null) return fromGenerator(function* () {});
  if (typeof source === 'function') {
    return createEnumerable(() => {
      const value = (source as () => Iterable<T> | Iterator<T>)();
      return isIterable(value) ? value[Symbol.iterator]() : value;
    });
  }
  if (isIterable(source)) return createEnumerable(() => source[Symbol.iterator]() as Iterator<T>);
  if (typeof (source as Iterator<T>).next === 'function') return createEnumerable(() => source as Iterator<T>);
  if (isArrayLike(source)) return fromGenerator(function* () { for (let i = 0; i < source.length; i++) yield source[i] as T; });
  if (typeof source === 'object') {
    return fromGenerator(function* () {
      for (const key of Object.keys(source)) {
        const value = (source as Record<string, unknown>)[key];
        if (typeof value !== 'function') yield { key, value } as T;
      }
    });
  }
  return fromGenerator(function* () { yield source as T; });
}
