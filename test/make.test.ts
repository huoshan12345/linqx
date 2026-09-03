import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("make", function () {
    const actual = Enumerable.make("hoge").toArray();
    deepEqual(actual, ["hoge"]);
  });
});
test('make preserves object identity', () => {
  const value = { id: 1 };

  expect(Enumerable.make(value).first()).toBe(value);
});

test('make can contain undefined', () => {
  expect(Enumerable.make(undefined).toArray()).toEqual([undefined]);
});
