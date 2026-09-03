import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("unfold", function () {
    const actual = Enumerable.unfold(5, (value) => value + 3).take(5).toArray();
    expect(actual).toEqual([5, 8, 11, 14, 17]);
  });
});
test('unfold starts with the seed and repeatedly transforms the previous value', () => {
  expect(Enumerable.unfold(1, value => value * 2).take(5).toArray()).toEqual([1, 2, 4, 8, 16]);
});

test('unfold does not transform beyond the values requested by the consumer', () => {
  const transform = vi.fn((value: number) => value + 1);

  expect(Enumerable.unfold(0, transform).take(1).toArray()).toEqual([0]);
  expect(transform).not.toHaveBeenCalled();
});
