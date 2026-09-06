// @vitest-environment jsdom

import { describe, expect, test, vi } from 'vitest';
import '../src/extensions.js';
import type { IEnumerable } from '../src/types.js';

interface ExtensionFixture {
  sequence: IEnumerable<unknown>;
  expected: unknown[];
  mutate: () => unknown[];
}

interface ExtensionCase {
  name: string;
  create: (empty?: boolean) => ExtensionFixture;
}

function createContainer(empty: boolean): HTMLDivElement {
  const container = document.createElement('div');
  if (!empty) {
    for (const value of ['a', 'b', 'c']) {
      const child = document.createElement('span');
      child.textContent = value;
      container.appendChild(child);
    }
  }
  return container;
}

const cases: ExtensionCase[] = [
  {
    name: 'Array',
    create(empty = false) {
      const source = empty ? [] : [1, 2, 3];
      const expected = [...source];
      return {
        sequence: source.asEnumerable(),
        expected,
        mutate() {
          source.push(4);
          return [...expected, 4];
        },
      };
    },
  },
  {
    name: 'Map',
    create(empty = false) {
      const source = new Map(empty ? [] : [['a', 1], ['b', 2], ['c', 3]]);
      const expected = [...source];
      return {
        sequence: source.asEnumerable(),
        expected,
        mutate() {
          source.set('d', 4);
          return [...expected, ['d', 4]];
        },
      };
    },
  },
  {
    name: 'NamedNodeMap',
    create(empty = false) {
      const element = document.createElement('div');
      if (!empty) {
        for (const name of ['a', 'b', 'c']) {
          element.setAttribute(name, name);
        }
      }
      const expected = [...element.attributes];
      return {
        sequence: element.attributes.asEnumerable(),
        expected,
        mutate() {
          element.setAttribute('d', 'd');
          return [...expected, element.getAttributeNode('d')!];
        },
      };
    },
  },
  {
    name: 'NodeList (live childNodes)',
    create(empty = false) {
      const container = createContainer(empty);
      const expected = [...container.childNodes];
      return {
        sequence: container.childNodes.asEnumerable(),
        expected,
        mutate() {
          const child = document.createTextNode('d');
          container.appendChild(child);
          return [...expected, child];
        },
      };
    },
  },
  {
    name: 'NodeList (static querySelectorAll)',
    create(empty = false) {
      const container = createContainer(empty);
      const source = container.querySelectorAll('span');
      const expected = [...source];
      return {
        sequence: source.asEnumerable(),
        expected,
        mutate() {
          container.appendChild(document.createElement('span'));
          return expected;
        },
      };
    },
  },
  {
    name: 'HTMLCollection',
    create(empty = false) {
      const container = createContainer(empty);
      const expected = [...container.children];
      return {
        sequence: container.children.asEnumerable(),
        expected,
        mutate() {
          const child = document.createElement('span');
          child.textContent = 'd';
          container.appendChild(child);
          return [...expected, child];
        },
      };
    },
  },
];

for (const { name, create } of cases) {
  describe(`${name}.asEnumerable`, () => {
    test('repeats a full enumeration on the same sequence', () => {
      const { sequence, expected } = create();

      expect(sequence.toArray()).toEqual(expected);
      expect(sequence.toArray()).toEqual(expected);
    });

    test('restarts empty sequences and preserves source mutation semantics', () => {
      const { sequence, mutate } = create(true);

      expect(sequence.toArray()).toEqual([]);
      expect(sequence.toArray()).toEqual([]);
      const expected = mutate();
      expect(sequence.toArray()).toEqual(expected);
      expect(sequence.toArray()).toEqual(expected);
    });

    test('reexecutes deferred queries and resets operator indexes on each enumeration', () => {
      const { sequence, expected } = create();
      const selector = vi.fn((value: unknown, index: number) => ({ value, index }));
      const query = sequence.where((_, index) => index > 0).select(selector);
      const results = expected.slice(1).map((value, index) => ({ value, index }));

      expect(selector).not.toHaveBeenCalled();
      expect(query.toArray()).toEqual(results);
      expect(query.toArray()).toEqual(results);
      expect(selector).toHaveBeenCalledTimes(results.length * 2);
    });

    test.each(['any', 'first', 'take', 'break'] as const)(
      'restarts after early termination with %s',
      operation => {
        const { sequence, expected } = create();

        switch (operation) {
          case 'any':
            expect(sequence.any()).toBe(true);
            break;
          case 'first':
            expect(sequence.first()).toEqual(expected[0]);
            break;
          case 'take':
            expect(sequence.take(1).toArray()).toEqual(expected.slice(0, 1));
            break;
          case 'break':
            for (const value of sequence) {
              expect(value).toEqual(expected[0]);
              break;
            }
            break;
        }

        expect(sequence.toArray()).toEqual(expected);
      },
    );

    test('keeps interleaved native iterators independent', () => {
      const { sequence, expected } = create();
      const first = sequence[Symbol.iterator]();
      const second = sequence[Symbol.iterator]();

      expect(first === second).toBe(false);
      expect(first.next()).toEqual({ done: false, value: expected[0] });
      expect(first.next()).toEqual({ done: false, value: expected[1] });
      expect(second.next()).toEqual({ done: false, value: expected[0] });
      expect(first.next()).toEqual({ done: false, value: expected[2] });
      expect(first.next().done).toBe(true);
      expect(second.next()).toEqual({ done: false, value: expected[1] });
      expect(second.next()).toEqual({ done: false, value: expected[2] });
      expect(second.next().done).toBe(true);
    });

    test('keeps imperative enumerators independent even after one is disposed', () => {
      const { sequence, expected } = create();
      const first = sequence.getEnumerator();
      const second = sequence.getEnumerator();

      try {
        expect(first.moveNext()).toBe(true);
        expect(first.current()).toEqual(expected[0]);
        expect(first.moveNext()).toBe(true);
        expect(first.current()).toEqual(expected[1]);
        expect(second.moveNext()).toBe(true);
        expect(second.current()).toEqual(expected[0]);
        first.dispose();
        expect(first.moveNext()).toBe(false);
        expect(second.moveNext()).toBe(true);
        expect(second.current()).toEqual(expected[1]);
        expect(second.moveNext()).toBe(true);
        expect(second.current()).toEqual(expected[2]);
        expect(second.moveNext()).toBe(false);
        expect(sequence.toArray()).toEqual(expected);
      } finally {
        first.dispose();
        second.dispose();
      }
    });

    test.each(['before', 'after'] as const)(
      'preserves source mutation semantics %s the first enumeration',
      timing => {
        const { sequence, expected, mutate } = create();
        if (timing === 'after') {
          expect(sequence.toArray()).toEqual(expected);
        }

        const updated = mutate();
        expect(sequence.toArray()).toEqual(updated);
        expect(sequence.toArray()).toEqual(updated);
      },
    );
  });
}
