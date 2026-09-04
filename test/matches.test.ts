import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("matches", function () {
    let actual = Enumerable.matches<RegExpMatchArray>("xbcyBCzbc", /(.)bc/i).select((value) => value.index + value[1]).toArray();
    expect(actual).toEqual(["0x", "3y", "6z"]);
    actual = Enumerable.matches<RegExpMatchArray>("xbcyBCzbc", "(.)bc").select((value) => value.index + value[1]).toArray();;
    expect(actual).toEqual(["0x", "6z"]);
    actual = Enumerable.matches<RegExpMatchArray>("xbcyBCzbc", "(.)bc", "i").select((value) => value.index + value[1]).toArray();;
    expect(actual).toEqual(["0x", "3y", "6z"]);
  });
});
test('matches makes a non-global regular expression global without changing it', () => {
  const pattern = /a/;
  const matches = Enumerable.matches('aba', pattern).map(match => match.index);

  expect(matches).toEqual([0, 2]);
  expect(pattern.global).toBe(false);
  expect(pattern.lastIndex).toBe(0);
});

test('matches advances after zero-length matches', () => {
  expect(Enumerable.matches('aa', /(?=a)/g).map(match => match.index)).toEqual([0, 1]);
});
