import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, test } from './test-utils.js';

describe("Aggregate", () => {
  test("sum", function () {
    let actual = Enumerable.range(1, 10).sum();
    equal(actual, 55);
    actual = Enumerable.empty().sum();
    equal(actual, 0);

    actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).sum((t) => t.i);
    equal(actual, 45);
  });
});
test('sum projects source elements before adding them', () => {
  expect(Enumerable.from([{ value: 2 }, { value: 3 }]).sum(item => item.value)).toBe(5);
});

test('sum returns zero for an empty sequence', () => {
  expect(Enumerable.empty<number>().sum()).toBe(0);
});
