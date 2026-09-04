import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Action", () => {
  test("forEach", function () {
    let actual: number[] = [];
    Enumerable.range(1, 10).forEach(function (i) { actual.push(i); });
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    actual = [];
    let actual2: number[] = [];
    Enumerable.range(1, 10).forEach(function (v, i) { actual.push(v); actual2.push(i); });
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(actual2).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    actual = [];
    Enumerable.range(1, 10).forEach(function (i) { if (i === 5) return false; actual.push(i); });
    expect(actual).toEqual([1, 2, 3, 4]);

    actual = [];
    actual2 = [];
    Enumerable.range(1, 10).forEach(function (v, i) { if (i === 5) return false; actual.push(v); actual2.push(i); });
    expect(actual).toEqual([1, 2, 3, 4, 5]);
    expect(actual2).toEqual([0, 1, 2, 3, 4]);
  });
});
test('forEach does nothing for an empty sequence', () => {
  const action = vi.fn();

  Enumerable.empty<number>().forEach(action);

  expect(action).not.toHaveBeenCalled();
});

test('forEach propagates errors from the action', () => {
  expect(() => Enumerable.make(1).forEach(() => {
    throw new Error('action failed');
  })).toThrow('action failed');
});

test('forEach accepts an expression-bodied callback returning a non-boolean value', () => {
  let cssCalls = 0;
  const fluentValue = {
    inlineBlock() {
      return this;
    },
    css(_property: string, _value: string) {
      cssCalls++;
      return this;
    },
  };

  Enumerable.make(fluentValue)
    .forEach(value => value.inlineBlock().css('padding', '0 2px'));

  expect(cssCalls).toBe(1);
});
