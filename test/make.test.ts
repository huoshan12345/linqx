import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("make", function () {
    const actual = Enumerable.make("hoge").toArray();
    expect(actual).toEqual(["hoge"]);
  });
});
test('make preserves object identity', () => {
  const value = { id: 1 };

  expect(Enumerable.make(value).first()).toBe(value);
});

test('make can contain undefined', () => {
  expect(Enumerable.make(undefined).toArray()).toEqual([undefined]);
});
