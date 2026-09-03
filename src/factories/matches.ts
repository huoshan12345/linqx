import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

export function matches<T extends RegExpMatchArray = RegExpMatchArray>(
  input: string,
  pattern: RegExp | string,
  flags?: string,
): IEnumerable<T> {
  return fromGenerator(function* () {
    let expression: RegExp;

    if (pattern instanceof RegExp) {
      const globalFlags = pattern.flags.includes('g')
        ? pattern.flags
        : `${pattern.flags}g`;
      expression = new RegExp(pattern.source, globalFlags);
    } else {
      const currentFlags = flags ?? '';
      const globalFlags = currentFlags.includes('g')
        ? currentFlags
        : `${currentFlags}g`;
      expression = new RegExp(pattern, globalFlags);
    }

    let match: RegExpExecArray | null;
    while ((match = expression.exec(input)) !== null) {
      yield match as T;

      if (match[0] === '') {
        expression.lastIndex++;
      }
    }
  });
}
