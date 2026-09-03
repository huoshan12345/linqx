import type { IEnumerable } from '../types.js';
import { createEnumerable, fromGenerator } from '../internal/create-enumerable.js';
import { isArrayLike, isIterable } from '../internal/functions.js';

/** @returns An empty sequence. */
export function from(): IEnumerable<unknown>;

/**
 * Wraps a number as a single-element sequence.
 *
 * @param source The number to wrap.
 * @returns A sequence containing `source`.
 */
export function from(source: number): IEnumerable<number>;

/**
 * Wraps a boolean as a single-element sequence.
 *
 * @param source The boolean to wrap.
 * @returns A sequence containing `source`.
 */
export function from(source: boolean): IEnumerable<boolean>;

/**
 * Enumerates the characters in a string.
 *
 * @param source The string to enumerate.
 * @returns A reusable sequence of Unicode code-point strings.
 */
export function from(source: string): IEnumerable<string>;

/**
 * Converts an iterable, iterator, array-like object, or source factory to a linqx sequence.
 *
 * A source factory is called once per enumeration. A bare iterator is forward-only and is not
 * reset between enumerations.
 *
 * @param source The source to adapt or a function that creates one.
 * @returns A sequence over the source values.
 */
export function from<T>(
  source: Iterable<T> | Iterator<T> | ArrayLike<T> | (() => Iterable<T> | Iterator<T>),
): IEnumerable<T>;

/**
 * Enumerates an object's own enumerable string-keyed, non-function properties.
 *
 * @param source The object whose properties will be enumerated.
 * @returns A deferred sequence of key-value entries.
 */
export function from<TKey extends PropertyKey, TValue>(
  source: Record<TKey, TValue>,
): IEnumerable<{
  /** The property's key. */
  key: TKey;
  /** The property's value. */
  value: TValue;
}>;
export function from<T>(
  source?: T | Iterable<T> | Iterator<T> | ArrayLike<T> | (() => Iterable<T> | Iterator<T>),
): IEnumerable<T> {
  if (source == null) {
    return fromGenerator(function* () {});
  }

  if (typeof source === 'function') {
    return createEnumerable(() => {
      const value = (source as () => Iterable<T> | Iterator<T>)();
      return isIterable(value) ? value[Symbol.iterator]() : value;
    });
  }

  if (isIterable(source)) {
    return createEnumerable(() => source[Symbol.iterator]() as Iterator<T>);
  }

  if (typeof (source as Iterator<T>).next === 'function') {
    return createEnumerable(() => source as Iterator<T>);
  }

  if (isArrayLike(source)) {
    return fromGenerator(function* () {
      for (let index = 0; index < source.length; index++) {
        yield source[index] as T;
      }
    });
  }

  if (typeof source === 'object') {
    return fromGenerator(function* () {
      for (const key of Object.keys(source)) {
        const value = (source as Record<string, unknown>)[key];
        if (typeof value !== 'function') {
          yield { key, value } as T;
        }
      }
    });
  }

  return fromGenerator(function* () {
    yield source as T;
  });
}
