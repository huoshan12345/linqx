import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, test } from './test-utils.js';

describe("Enumerable", () => {
  test("from", function () {
    let actual: unknown = Enumerable.from("temp").toArray();
    deepEqual(actual, ["t", "e", "m", "p"]);

    actual = Enumerable.from(3).toArray();
    deepEqual(actual, [3]);

    actual = Enumerable.from([1, 2, 3, 4, 5]).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5]);

    actual = Enumerable.from({ foo: "bar", func: function () { } }).toArray();
    deepEqual(actual, [{ key: "foo", value: "bar" }]);
  });
});

describe("Iterator", () => {
  test("from Generator", function () {
    function* words() {
      yield "abc";
      yield "def";
    }

    deepEqual(Enumerable.from(words()).toArray(), ["abc", "def"]);

    const actual: string[] = [];
    for (const a of Enumerable.from(words())) {
      actual.push(a);
    }
    deepEqual(actual, ["abc", "def"]);
  });

  test("from Iterable object", function () {
    const map = new Map<number, number>();

    map.set(1, 2);
    map.set(2, 4);

    deepEqual(Enumerable
      .from(map)
      .select(item => ({ key: item[0], value: item[1] }))
      .select(item => item.key)
      .toArray(),
      [1, 2]);

    const actual: number[] = [];
    for (const a of map) {
      actual.push(a[0]);
    }
    deepEqual(actual, [1, 2]);

    const set = new Set([1, 2, 3]);
    equal(Enumerable.from(set).first(), 1);
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

    deepEqual(Enumerable.from(n[Symbol.iterator]()).toArray(), [1, 2, 3]);

    const actual: number[] = [];
    for (const a of n) {
      actual.push(a);
    }
    deepEqual(actual, [1, 2, 3]);
  });
});
