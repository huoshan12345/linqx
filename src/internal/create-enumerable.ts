import { EnumerableSequence } from '../core/enumerable.js';
import type { IEnumerable } from '../types.js';

export function createEnumerable<T>(iteratorFactory: () => Iterator<T>): IEnumerable<T> {
  return new EnumerableSequence(iteratorFactory);
}

export function fromGenerator<T>(generatorFactory: () => Generator<T>): IEnumerable<T> {
  return createEnumerable(generatorFactory);
}
