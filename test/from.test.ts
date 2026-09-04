import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("from", function () {
    let actual: unknown = Enumerable.from("temp").toArray();
    expect(actual).toEqual(["t", "e", "m", "p"]);

    actual = Enumerable.from(3).toArray();
    expect(actual).toEqual([3]);

    actual = Enumerable.from([1, 2, 3, 4, 5]).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5]);

    actual = Enumerable.from({ foo: "bar", func: function () { } }).toArray();
    expect(actual).toEqual([{ key: "foo", value: "bar" }]);
  });
});

describe("Iterator", () => {
  test("from Generator", function () {
    function* words() {
      yield "abc";
      yield "def";
    }

    expect(Enumerable.from(words()).toArray()).toEqual(["abc", "def"]);

    const actual: string[] = [];
    for (const a of Enumerable.from(words())) {
      actual.push(a);
    }
    expect(actual).toEqual(["abc", "def"]);
  });

  test("from Iterable object", function () {
    const map = new Map<number, number>();

    map.set(1, 2);
    map.set(2, 4);

    expect(Enumerable
      .from(map)
      .select(item => ({ key: item[0], value: item[1] }))
      .select(item => item.key)
      .toArray()).toEqual([1, 2]);

    const actual: number[] = [];
    for (const a of map) {
      actual.push(a[0]);
    }
    expect(actual).toEqual([1, 2]);

    const set = new Set([1, 2, 3]);
    expect(Enumerable.from(set).first()).toBe(1);
  });

  test("from Iterator object", function () {
    const n = {
      // This is just a simple replacement for the data structure that needs to be traversed.
      // It may actually be a tree or other data structure implemented by a custom traversal.
      nums: [1, 2, 3],

      [Symbol.iterator](): Iterator<number> {
        let idx = 0;
        return {
          next: (): IteratorResult<number> => {
            if (idx < this.nums.length) {
              return {
                value: this.nums[idx++]!,
                done: false,
              };
            }

            return {
              value: undefined,
              done: true,
            };
          },
        };
      }
    };

    expect(Enumerable.from(n[Symbol.iterator]()).toArray()).toEqual([1, 2, 3]);

    const actual: number[] = [];
    for (const a of n) {
      actual.push(a);
    }
    expect(actual).toEqual([1, 2, 3]);
  });
});
