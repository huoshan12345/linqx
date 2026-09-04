import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("traverseDepthFirst", function () {
    const values = Enumerable.make(1)
      .traverseDepthFirst(value => Enumerable.make(value + value))
      .take(7)
      .toArray();
    expect(values).toEqual([1, 2, 4, 8, 16, 32, 64]);

    const valuesWithLevels = Enumerable.make(1)
      .traverseDepthFirst(
        value => Enumerable.make(value + value),
        (value, level) => ({ value, level }))
      .take(3)
      .toArray();
    expect(valuesWithLevels).toEqual([
      { value: 1, level: 0 },
      { value: 2, level: 1 },
      { value: 4, level: 2 },
    ]);
  });
});
test('traverseDepthFirst reports zero-based levels', () => {
  const tree = [{ value: 'root', children: [{ value: 'leaf', children: [] }] }];

  expect(Enumerable.from(tree)
    .traverseDepthFirst(node => Enumerable.from(node.children),
      (node, level) => [node.value, level] as const)
    .toArray())
    .toEqual([['root', 0], ['leaf', 1]]);
});

test('traverseDepthFirst handles an empty root sequence', () => {
  expect(Enumerable.empty<{ children: never[]; }>()
    .traverseDepthFirst(node => Enumerable.from(node.children))
    .toArray())
    .toEqual([]);
});
