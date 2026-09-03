import Enumerable from './sut.js';

interface ObjectKey {
  a: number;
}

type Dictionary = Enumerable.IDictionary<string | ObjectKey, number>;
type ComparedDictionary = Enumerable.IDictionary<ObjectKey, number>;

const aComparer = (value: ObjectKey): number => value.a;
const obj1 = { a: 1 };
const obj1Copy = { a: 1 };
const obj2 = { a: 2 };
const obj2Copy = { a: 2 };

function createDictionary(): Dictionary {
  return Enumerable.empty<{ key: string | ObjectKey; value: number; }>()
    .toDictionary((entry) => entry.key, (entry) => entry.value);
}

function createComparedDictionary(): ComparedDictionary {
  return Enumerable.empty<{ key: ObjectKey; value: number; }>()
    .toDictionary((entry) => entry.key, (entry) => entry.value, aComparer);
}

function addObjectEntries(dictionary: Enumerable.IDictionary<ObjectKey, number>): void {
  dictionary.add(obj1, 1);
  dictionary.add(obj1Copy, 2);
  dictionary.add(obj2, 3);
  dictionary.add(obj2Copy, 4);
}

export {
  addObjectEntries,
  createComparedDictionary,
  createDictionary,
  obj1,
  obj1Copy,
  obj2,
  obj2Copy,
};
