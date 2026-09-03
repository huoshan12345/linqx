import { describe, expect, it } from 'vitest';
import Enumerable from './sut.js';

describe('map', () => {
  it('projects the sequence into an array', () => {
    expect(Enumerable.from([1, 2, 3]).map((value, index) => value * 10 + index))
      .toEqual([10, 21, 32]);
  });

  it('returns an empty array for an empty sequence', () => {
    expect(Enumerable.empty<number>().map(value => value)).toEqual([]);
  });
});
