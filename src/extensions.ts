import { Enumerable } from './index.js';
import { definePropertyIfAbsent } from './utils.js';

declare global {
  interface Map<K, V> {
    asEnumerable(): Enumerable.IEnumerable<[K, V]>;
  }

  interface Array<T> {
    asEnumerable(): Enumerable.IEnumerable<T>;
  }

  interface NamedNodeMap {
    asEnumerable(): Enumerable.IEnumerable<Attr>;
  }

  interface NodeList {
    asEnumerable(): Enumerable.IEnumerable<Node>;
  }

  interface HTMLCollection {
    asEnumerable(): Enumerable.IEnumerable<Element>;
  }
}

definePropertyIfAbsent(Array.prototype, 'asEnumerable', function <T>(this: Array<T>) {
  return Enumerable.from(this);
});

definePropertyIfAbsent(Map.prototype, 'asEnumerable', function <K, V>(this: Map<K, V>) {
  return Enumerable.from(this);
});

if (typeof document !== 'undefined') {
  definePropertyIfAbsent(NamedNodeMap.prototype, 'asEnumerable', function (this: NamedNodeMap) {
    return Enumerable.from(this);
  });

  definePropertyIfAbsent(NodeList.prototype, 'asEnumerable', function (this: NodeList) {
    return Enumerable.from(this);
  });

  definePropertyIfAbsent(HTMLCollection.prototype, 'asEnumerable', function (this: HTMLCollection) {
    return Enumerable.from(this);
  });
}
