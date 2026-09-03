import type { IDisposableEnumerable } from '../types.js';
import { EnumerableSequence } from './enumerable.js';

export class SharedEnumerable<T> extends EnumerableSequence<T> {
  private readonly sourceIterator: Iterator<T>;
  private disposed = false;

  constructor(source: Iterable<T>) {
    const state: { next: () => IteratorResult<T> } = { next: () => ({ done: true, value: undefined }) };
    super(() => ({ next: () => state.next() }));
    this.sourceIterator = source[Symbol.iterator]();
    state.next = () => this.disposed
      ? { done: true, value: undefined }
      : this.sourceIterator.next();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.sourceIterator.return?.();
  }
}

export interface SharedEnumerable<T> extends IDisposableEnumerable<T> {}
