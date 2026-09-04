import type { IEnumerable } from '../types.js';
import { fromGenerator } from '../internal/create-enumerable.js';

/**
 * Enumerates every regular-expression match in a string.
 *
 * A cloned expression is made global automatically, so the supplied `RegExp.lastIndex` is not
 * read or modified.
 *
 * @param input The string to search.
 * @param pattern A regular expression or pattern string.
 * @param flags Flags used only when `pattern` is a string; `g` is added when absent.
 * @returns A deferred sequence of regular-expression match arrays.
 * @throws {SyntaxError} When a pattern string or its flags are invalid.
 */
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
