import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Convert", () => {
  test("toObject", function () {
    const actual = Enumerable.range(1, 3).toObject((i) => 'foo' + i, (i) => i * 4);
    deepEqual(actual, { foo1: 4, foo2: 8, foo3: 12 });
  });
});
test('toObject keeps the last value for duplicate property keys', () => {
  expect(Enumerable.from([
    { key: 'a', value: 1 },
    { key: 'a', value: 2 },
  ]).toObject(item => item.key, item => item.value))
    .toEqual({ a: 2 });
});

test('toObject supports symbol keys', () => {
  const key = Symbol('key');
  const result = Enumerable.make(1).toObject(() => key);

  expect(result[key]).toBe(1);
});
