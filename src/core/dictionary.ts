import type { IDictionary, IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';
import { identity } from '../internal/functions.js';

interface Entry<TKey, TValue> {
  key: TKey;
  value: TValue;
}

export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue> {
  private readonly entries = new Map<unknown, Entry<TKey, TValue>>();

  constructor(private readonly compareSelector: (key: TKey) => unknown = identity) {}

  add(key: TKey, value: TValue): void {
    this.entries.set(this.compareSelector(key), { key, value });
  }

  get(key: TKey): TValue {
    return this.entries.get(this.compareSelector(key))?.value as TValue;
  }

  set(key: TKey, value: TValue): boolean {
    const comparisonKey = this.compareSelector(key);
    const exists = this.entries.has(comparisonKey);
    this.entries.set(comparisonKey, { key, value });
    return exists;
  }

  contains(key: TKey): boolean {
    return this.entries.has(this.compareSelector(key));
  }

  clear(): void {
    this.entries.clear();
  }

  remove(key: TKey): void {
    this.entries.delete(this.compareSelector(key));
  }

  count(): number {
    return this.entries.size;
  }

  toEnumerable(): IEnumerable<{ key: TKey; value: TValue }> {
    const entries = this.entries;
    return fromGenerator(function* () {
      for (const entry of entries.values()) yield { key: entry.key, value: entry.value };
    });
  }
}
