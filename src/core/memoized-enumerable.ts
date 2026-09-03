import type { IDisposableEnumerable } from '../types.js';
import { EnumerableSequence } from './enumerable.js';

export class MemoizedEnumerable<T> extends EnumerableSequence<T> {
  private readonly sourceIterator: Iterator<T>;
  private readonly cache: T[] = [];
  private completed = false;

  constructor(source: Iterable<T>) {
    const state: { iterator: (index: number) => IteratorResult<T> } = {
      iterator: () => ({ done: true, value: undefined }),
    };
    super(() => {
      let index = 0;
      return { next: () => state.iterator(index++) };
    });
    this.sourceIterator = source[Symbol.iterator]();
    state.iterator = index => this.nextAt(index);
  }

  private nextAt(index: number): IteratorResult<T> {
    if (index < this.cache.length) return { done: false, value: this.cache[index]! };
    if (this.completed) return { done: true, value: undefined };
    const result = this.sourceIterator.next();
    if (result.done) {
      this.completed = true;
      return { done: true, value: undefined };
    }
    this.cache.push(result.value);
    return { done: false, value: result.value };
  }

  dispose(): void {
    if (this.completed) return;
    this.completed = true;
    this.sourceIterator.return?.();
  }
}

export interface MemoizedEnumerable<T> extends IDisposableEnumerable<T> {}
