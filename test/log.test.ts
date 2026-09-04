import { afterEach, describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('log', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('logs each element during enumeration', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(Enumerable.from([1, 2]).log().toArray()).toEqual([1, 2]);
    expect(log.mock.calls).toEqual([[1], [2]]);
  });

  test('logs selected values while preserving source elements', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(Enumerable.from([1, 2]).log(value => value * 10).toArray()).toEqual([1, 2]);
    expect(log.mock.calls).toEqual([[10], [20]]);
  });

  test('is deferred until the sequence is consumed', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const sequence = Enumerable.make(1).log();

    expect(log).not.toHaveBeenCalled();
    sequence.force();
    expect(log).toHaveBeenCalledOnce();
  });
});
