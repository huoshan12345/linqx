import Enumerable from '../legacy-enumerable.js';

interface ObjectKey {
  a: number;
}

const aComparer = (value: ObjectKey): number => value.a;
const obj1 = { a: 1 };
const obj1Copy = { a: 1 };
const obj2 = { a: 2 };
const obj2Copy = { a: 2 };

function createDictionary(): any {
  return Enumerable.empty().toDictionary();
}

function createComparedDictionary(): any {
  return Enumerable.empty().toDictionary('', '', aComparer);
}

function addObjectEntries(dictionary: any): void {
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
