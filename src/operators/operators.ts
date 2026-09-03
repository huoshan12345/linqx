import { aggregate } from './aggregate.js';
import { all } from './all.js';
import { alternate } from './alternate.js';
import { any } from './any.js';
import { asEnumerable } from './as-enumerable.js';
import { average } from './average.js';
import { buffer } from './buffer.js';
import { cast } from './cast.js';
import { catchError } from './catch-error.js';
import { choose } from './choose.js';
import { chunk } from './chunk.js';
import { concat } from './concat.js';
import { contains } from './contains.js';
import { count } from './count.js';
import { createOrderedEnumerable } from './create-ordered-enumerable.js';
import { defaultIfEmpty } from './default-if-empty.js';
import { distinct } from './distinct.js';
import { distinctUntilChanged } from './distinct-until-changed.js';
import { doAction } from './do-action.js';
import { elementAt } from './element-at.js';
import { elementAtOrDefault } from './element-at-or-default.js';
import { except } from './except.js';
import { finallyAction } from './finally-action.js';
import { first } from './first.js';
import { firstOrDefault } from './first-or-default.js';
import { flatten } from './flatten.js';
import { force } from './force.js';
import { forEach } from './for-each.js';
import { groupBy } from './group-by.js';
import { groupJoin } from './group-join.js';
import { index } from './index.js';
import { indexOf } from './index-of.js';
import { insert } from './insert.js';
import { intersect } from './intersect.js';
import { isEmpty } from './is-empty.js';
import { join } from './join.js';
import { joinWith } from './join-with.js';
import { last } from './last.js';
import { lastIndexOf } from './last-index-of.js';
import { lastOrDefault } from './last-or-default.js';
import { leftJoin } from './left-join.js';
import { letBind } from './let-bind.js';
import { log } from './log.js';
import { map } from './map.js';
import { max } from './max.js';
import { maxBy } from './max-by.js';
import { memoize } from './memoize.js';
import { merge } from './merge.js';
import { min } from './min.js';
import { minBy } from './min-by.js';
import { ofType } from './of-type.js';
import { orderBy } from './order-by.js';
import { orderByDescending } from './order-by-descending.js';
import { page } from './page.js';
import { pairwise } from './pairwise.js';
import { partitionBy } from './partition-by.js';
import { position } from './position.js';
import { reverse } from './reverse.js';
import { scan } from './scan.js';
import { select } from './select.js';
import { selectMany } from './select-many.js';
import { sequenceEqual } from './sequence-equal.js';
import { share } from './share.js';
import { shuffle } from './shuffle.js';
import { single } from './single.js';
import { singleOrDefault } from './single-or-default.js';
import { skip } from './skip.js';
import { skipWhile } from './skip-while.js';
import { sum } from './sum.js';
import { take } from './take.js';
import { takeExceptLast } from './take-except-last.js';
import { takeFromLast } from './take-from-last.js';
import { takeWhile } from './take-while.js';
import { thenBy } from './then-by.js';
import { thenByDescending } from './then-by-descending.js';
import { toArray } from './to-array.js';
import { toDictionary } from './to-dictionary.js';
import { toJoinedString } from './to-joined-string.js';
import { toJSONString } from './to-json-string.js';
import { toLookup } from './to-lookup.js';
import { toMap } from './to-map.js';
import { toObject } from './to-object.js';
import { trace } from './trace.js';
import { traverseBreadthFirst } from './traverse-breadth-first.js';
import { traverseDepthFirst } from './traverse-depth-first.js';
import { union } from './union.js';
import { weightedSample } from './weighted-sample.js';
import { where } from './where.js';
import { whereIf } from './where-if.js';
import { withNeighbors } from './with-neighbors.js';
import { zip } from './zip.js';

export const instanceOperators = {
  aggregate, all, alternate, any, asEnumerable, average, buffer, cast, catchError,
  choose, chunk, concat, contains, count, createOrderedEnumerable, defaultIfEmpty,
  distinct, distinctUntilChanged, doAction, elementAt, elementAtOrDefault, except,
  finallyAction, first, firstOrDefault, flatten, force, forEach, groupBy, groupJoin,
  index, indexOf, insert, intersect, isEmpty, join, joinWith, last, lastIndexOf,
  lastOrDefault, leftJoin, letBind, log, map, max, maxBy, memoize, merge, min, minBy,
  ofType, orderBy, orderByDescending, page, pairwise, partitionBy, position, reverse,
  scan, select, selectMany, sequenceEqual, share, shuffle, single, singleOrDefault,
  skip, skipWhile, sum, take, takeExceptLast, takeFromLast, takeWhile, thenBy,
  thenByDescending, toArray, toDictionary, toJoinedString, toJSONString, toLookup,
  toMap, toObject, trace, traverseBreadthFirst, traverseDepthFirst, union,
  weightedSample, where, whereIf, withNeighbors, zip,
};
