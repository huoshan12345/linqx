import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Action", () => {
  test("doAction", function () {
    let array: number[] = [];
    let actual = Enumerable.range(1, 10).doAction(function (i) { array.push(i); }).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    array = [];
    const array2: number[] = [];
    actual = Enumerable.range(1, 10).doAction(function (v, i) { array.push(v); array2.push(i); }).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(actual).toEqual(array);
    expect([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(array2);
  });
});
test('doAction remains lazy until the sequence is consumed', () => {
  const visited: number[] = [];
  const sequence = Enumerable.range(1, 3).doAction(value => {
    visited.push(value);
  });

  expect(visited).toEqual([]);
  expect(sequence.toArray()).toEqual([1, 2, 3]);
  expect(visited).toEqual([1, 2, 3]);
});

test('doAction stops before yielding the element whose action returns false', () => {
  expect(Enumerable.range(1, 5).doAction(value => value < 3).toArray()).toEqual([1, 2]);
});

test('doAction accepts an expression-bodied callback returning a non-boolean value', () => {
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

  const result = Enumerable.make(fluentValue)
    .doAction(value => value.inlineBlock().css('padding', '0 2px'))
    .toArray();

  expect(result).toEqual([fluentValue]);
  expect(cssCalls).toBe(1);
});
