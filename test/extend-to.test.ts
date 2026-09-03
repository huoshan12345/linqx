import { afterEach, describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

class Values implements Iterable<number> {
  *[Symbol.iterator](): Iterator<number> {
    yield 1;
    yield 2;
    yield 3;
  }
}

describe('Enumerable.Utils.extendTo', () => {
  afterEach(() => {
    Enumerable.Utils.recallFrom(Values);
  });

  test('adds LINQ operators to a custom iterable prototype', () => {
    Enumerable.Utils.extendTo(Values);
    const values = new Values() as Values & Enumerable.IEnumerable<number>;

    expect(values.where(value => value > 1).toArray()).toEqual([2, 3]);
  });

  test('uses a ByLinq suffix when a member name already exists', () => {
    class ValuesWithMap extends Values {
      map(): string {
        return 'native';
      }
    }

    Enumerable.Utils.extendTo(ValuesWithMap);
    const values = new ValuesWithMap() as ValuesWithMap & {
      mapByLinq<TResult>(selector: (value: number, index: number) => TResult): TResult[];
    };

    expect(values.map()).toBe('native');
    expect(values.mapByLinq(value => value * 2)).toEqual([2, 4, 6]);
    Enumerable.Utils.recallFrom(ValuesWithMap);
  });

  test('rejects values without a constructor prototype', () => {
    expect(() => Enumerable.Utils.extendTo({})).toThrow(TypeError);
  });
});
