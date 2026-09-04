import { afterEach, describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('trace', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('uses the default Trace prefix', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    expect(Enumerable.make(1).trace().toArray()).toEqual([1]);
    expect(log).toHaveBeenCalledWith('Trace:', 1);
  });

  test('supports a custom prefix and selector', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);

    Enumerable.make(2).trace('Value', value => value * 10).force();

    expect(log).toHaveBeenCalledWith('Value:', 20);
  });

  test('is deferred until the sequence is consumed', () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const sequence = Enumerable.make(1).trace();

    expect(log).not.toHaveBeenCalled();
    sequence.force();
    expect(log).toHaveBeenCalledOnce();
  });
});
