import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('Enumerable.Utils.createLambda', () => {
  test('returns a supplied function unchanged', () => {
    const lambda = (value: number) => value * 2;

    expect(Enumerable.Utils.createLambda(lambda)).toBe(lambda);
  });

  test('creates an identity function for nullish input', () => {
    expect(Enumerable.Utils.createLambda(undefined)(1)).toBe(1);
    expect(Enumerable.Utils.createLambda(null)('value')).toBe('value');
  });

  test('rejects string Lambda expressions and other non-functions', () => {
    expect(() => Enumerable.Utils.createLambda('value => value')).toThrow(TypeError);
    expect(() => Enumerable.Utils.createLambda(1)).toThrow(TypeError);
  });
});
