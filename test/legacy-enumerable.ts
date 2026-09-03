import Enumerable from '../linq.js';

// Legacy tests exercise JavaScript-only APIs that are not fully represented by linq.d.ts,
// including string lambdas and methods installed dynamically on built-in prototypes.
const legacyEnumerable: any = Enumerable;

export default legacyEnumerable;
