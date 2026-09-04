import { EnumerableSequence } from './enumerable.js';
import type { IGrouping } from '../types.js';

export class Grouping<TKey, TElement> extends EnumerableSequence<TElement> {
  constructor(private readonly groupKey: TKey, private readonly source: TElement[]) {
    super(() => source[Symbol.iterator]());
  }

  key(): TKey {
    return this.groupKey;
  }

  getSource(): TElement[] {
    return this.source;
  }
}

export interface Grouping<TKey, TElement> extends IGrouping<TKey, TElement> {}
