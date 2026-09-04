import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('Enumerable.Utils.recallFrom', () => {
  test('removes operators previously added to a prototype', () => {
    class Values implements Iterable<number> {
      *[Symbol.iterator](): Iterator<number> {
        yield 1;
      }
    }

    Enumerable.Utils.extendTo(Values);
    expect('where' in Values.prototype).toBe(true);

    Enumerable.Utils.recallFrom(Values);

    expect('where' in Values.prototype).toBe(false);
    expect('getEnumerator' in Values.prototype).toBe(false);
  });

  test('preserves pre-existing prototype members', () => {
    class Values {
      map(): string {
        return 'native';
      }
    }

    Enumerable.Utils.extendTo(Values);
    Enumerable.Utils.recallFrom(Values);

    expect(new Values().map()).toBe('native');
  });

  test('rejects values without a constructor prototype', () => {
    expect(() => Enumerable.Utils.recallFrom(null)).toThrow(TypeError);
  });
});
