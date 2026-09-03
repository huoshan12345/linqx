import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function matches<T extends RegExpMatchArray = RegExpMatchArray>(input: string, pattern: RegExp | string, flags?: string): IEnumerable<T> {
  return fromGenerator(function* () {
    const expression = pattern instanceof RegExp
      ? new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
      : new RegExp(pattern, (flags ?? '') + ((flags ?? '').includes('g') ? '' : 'g'));
    let match: RegExpExecArray | null;
    while ((match = expression.exec(input)) !== null) {
      yield match as T;
      if (match[0] === '') expression.lastIndex++;
    }
  });
}
