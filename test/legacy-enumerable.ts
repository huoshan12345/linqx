import Enumerable from '../linq.js';

// The migrated runtime tests cover APIs that are not yet fully represented by linq.d.ts,
// including permissive overloads and methods installed dynamically on built-in prototypes.
const legacyEnumerable: any = Enumerable;

export default legacyEnumerable;
