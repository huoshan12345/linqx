import type { IEnumerable, IEnumerator } from './types.js';
import { Enumerator } from './core/enumerator.js';
import { createEnumerable as createSequence } from './internal/create-enumerable.js';
import { instanceOperators } from './operators/operators.js';

export interface EnumerableUtils {
  createLambda<T>(
    expression?: T,
  ): T extends null | undefined ? (value: unknown) => unknown : T;
  createEnumerable<T>(getEnumerator: () => IEnumerator<T>): IEnumerable<T>;
  createEnumerator<T>(
    initialize: () => void,
    tryGetNext: () => boolean,
    dispose: () => void,
  ): IEnumerator<T>;
  extendTo(type: unknown): void;
  recallFrom(type: unknown): void;
  hasNativeIteratorSupport(): boolean;
}

function createLambda<T>(
  expression?: T,
): T extends null | undefined ? (value: unknown) => unknown : T {
  if (expression == null) {
    return ((value: unknown) => value) as T extends null | undefined
      ? (value: unknown) => unknown
      : T;
  }

  if (typeof expression !== 'function') {
    throw new TypeError('Lambda expressions must be functions.');
  }

  return expression as T extends null | undefined ? (value: unknown) => unknown : T;
}

function createEnumerable<T>(getEnumerator: () => IEnumerator<T>): IEnumerable<T> {
  return createSequence(() => {
    const enumerator = getEnumerator();
    return {
      next: (): IteratorResult<T> => enumerator.moveNext()
        ? { done: false, value: enumerator.current() }
        : { done: true, value: undefined as never },
      return: (): IteratorReturnResult<never> => {
        enumerator.dispose();
        return { done: true, value: undefined as never };
      },
    };
  });
}

function createEnumerator<T>(
  initialize: () => void,
  tryGetNext: () => boolean,
  dispose: () => void,
): IEnumerator<T> {
  let initialized = false;
  let currentValue!: T;
  let completed = false;
  const yielder = {
    yieldReturn(value: T): boolean {
      currentValue = value;
      return true;
    },
    yieldBreak(): boolean {
      completed = true;
      return false;
    },
  };
  return {
    current: () => currentValue,
    moveNext: () => {
      if (completed) {
        return false;
      }

      if (!initialized) {
        initialize();
        initialized = true;
      }

      try {
        const result = tryGetNext.call(yielder);
        if (!result) {
          dispose();
          completed = true;
        }
        return result;
      } catch (error) {
        dispose();
        completed = true;
        throw error;
      }
    },
    dispose: () => {
      if (!completed) {
        dispose();
      }

      completed = true;
    },
  };
}

function getPrototype(type: unknown): Record<string, unknown> {
  if (typeof type !== 'function' || !(type as { prototype?: unknown }).prototype) {
    throw new TypeError('Expected a constructor function.');
  }
  return (type as { prototype: Record<string, unknown> }).prototype;
}

function extendTo(type: unknown): void {
  const prototype = getPrototype(type);
  if (!Object.prototype.hasOwnProperty.call(prototype, 'getEnumerator')) {
    Object.defineProperty(prototype, 'getEnumerator', {
      configurable: true,
      writable: true,
      value(this: Iterable<unknown>) {
        return new Enumerator(this[Symbol.iterator]());
      },
    });
  }
  if (type === Array && !Object.prototype.hasOwnProperty.call(prototype, 'getSource')) {
    Object.defineProperty(prototype, 'getSource', {
      configurable: true,
      writable: true,
      value(this: unknown[]) {
        return this;
      },
    });
  }
  for (const [name, method] of Object.entries(instanceOperators)) {
    const targetName = prototype[name] == null ? name : `${name}ByLinq`;
    if (prototype[targetName] === method) {
      continue;
    }

    Object.defineProperty(prototype, targetName, {
      configurable: true,
      writable: true,
      value: method,
    });
  }
}

function recallFrom(type: unknown): void {
  const prototype = getPrototype(type);
  if (Object.prototype.hasOwnProperty.call(prototype, 'getEnumerator')) {
    delete prototype.getEnumerator;
  }

  if (type === Array && Object.prototype.hasOwnProperty.call(prototype, 'getSource')) {
    delete prototype.getSource;
  }

  for (const [name, method] of Object.entries(instanceOperators)) {
    if (prototype[`${name}ByLinq`] === method) {
      delete prototype[`${name}ByLinq`];
    } else if (prototype[name] === method) {
      delete prototype[name];
    }
  }
}

export const Utils: EnumerableUtils = {
  createLambda,
  createEnumerable,
  createEnumerator,
  extendTo,
  recallFrom,
  hasNativeIteratorSupport: () => (
    typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
  ),
};
