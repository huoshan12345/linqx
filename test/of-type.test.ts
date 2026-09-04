import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("ofType", function () {
    const seq = Enumerable.from([1, 2, "hoge", "3", 4, true]);
    expect(seq.ofType<number>(Number).toArray()).toEqual([1, 2, 4]);
    expect(seq.ofType<string>(String).toArray()).toEqual(["hoge", "3"]);
    expect(seq.ofType<boolean>(Boolean).toArray()).toEqual([true]);

    class Cls {
      constructor(public val: string) { }
    }
    const instances = Enumerable.from([new Cls("a"), new Cls("b"), 1, 2, new Cls("c"), 3]);
    expect(instances.ofType<Cls>(Cls).select((value) => value.val).toArray()).toEqual(["a", "b", "c"]);
  });
});
test('ofType recognizes primitive wrapper constructors', () => {
  const source = Enumerable.from<unknown>([1, 'a', true, new Number(2)]);

  expect(source.ofType<number>(Number).toArray()).toEqual([1]);
  expect(source.ofType<string>(String).toArray()).toEqual(['a']);
  expect(source.ofType<boolean>(Boolean).toArray()).toEqual([true]);
});

test('ofType filters class instances and rejects non-constructors', () => {
  class Item { }
  const item = new Item();

  expect(Enumerable.from<unknown>([item, {}]).ofType<Item>(Item).toArray()).toEqual([item]);
  expect(Enumerable.from<unknown>([item]).ofType<Item>({}).toArray()).toEqual([]);
});
