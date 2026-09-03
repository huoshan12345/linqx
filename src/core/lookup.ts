import type { IEnumerable, ILookup } from '../types.js';
import { Grouping } from './grouping.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

interface LookupEntry<TKey, TElement> {
  key: TKey;
  elements: TElement[];
}

export class Lookup<TKey, TElement> implements ILookup<TKey, TElement> {
  private readonly entries = new Map<unknown, LookupEntry<TKey, TElement>>();

  constructor(private readonly compareSelector: (key: TKey) => unknown = identity) {}

  add(key: TKey, element: TElement): void {
    const comparisonKey = this.compareSelector(key);
    const entry = this.entries.get(comparisonKey);
    if (entry) entry.elements.push(element);
    else this.entries.set(comparisonKey, { key, elements: [element] });
  }

  count(): number {
    return this.entries.size;
  }

  get(key: TKey): IEnumerable<TElement> {
    const elements = this.entries.get(this.compareSelector(key))?.elements ?? [];
    return new Grouping(key, elements);
  }

  contains(key: TKey): boolean {
    return this.entries.has(this.compareSelector(key));
  }

  toEnumerable(): IEnumerable<Grouping<TKey, TElement>> {
    const entries = this.entries;
    return fromGenerator(function* () {
      for (const entry of entries.values()) yield new Grouping(entry.key, entry.elements);
    });
  }
}
