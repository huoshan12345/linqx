import type { IEnumerable, IEnumerator } from '../types.js';
import { Enumerator } from './enumerator.js';

export class EnumerableSequence<T> implements Iterable<T> {
  constructor(private readonly iteratorFactory: () => Iterator<T>) {}

  [Symbol.iterator](): Iterator<T> {
    return this.iteratorFactory();
  }

  getEnumerator(): IEnumerator<T> {
    return new Enumerator(this.iteratorFactory());
  }
}

export interface EnumerableSequence<T> extends IEnumerable<T> {}
