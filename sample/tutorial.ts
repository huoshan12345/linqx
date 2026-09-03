import Enumerable from '../dist/index.js';

console.log('# Lambda expressions\n');

// Anonymous function
Enumerable.range(1, 3)
  .select(function (value, index) {
    return `${index}:${value}`;
  })
  .log()
  .force();

// Arrow function
Enumerable.range(1, 3)
  .select((value, index) => `${index}:${value}`)
  .log()
  .force();

// Lambda expressions must be JavaScript functions. String Lambdas are no longer supported.
Enumerable.range(1, 3)
  .select(value => value * 2)
  .log()
  .force();

console.log('\n# Closures\n');

const expectedNumber = 3;
Enumerable.range(1, 10)
  .where(value => value === expectedNumber)
  .log()
  .force();

console.log('\n# Initializing from objects\n');

const object: Record<string, string | number | boolean> = {
  foo: 'a',
  bar: 100,
  foobar: true,
};

Enumerable.from(object).forEach(entry => {
  console.log(`${entry.key}:${entry.value}`);
});

console.log('\n# Continue and break when iterating\n');

Enumerable.repeat('foo', 10).forEach((value, index) => {
  if (index % 2 === 0) {
    return;
  }

  if (index > 6) {
    return false;
  }

  console.log(`${index}:${value}`);
});

console.log('\n# Grouping and key comparison\n');

interface DatedItem {
  date: Date;
  id: number;
}

const datedItems: DatedItem[] = [
  { date: new Date(2000, 1, 1), id: 1 },
  { date: new Date(2010, 5, 5), id: 2 },
  { date: new Date(2000, 1, 1), id: 3 },
];

// Date instances are compared by reference, so equal dates are separate keys by default.
Enumerable.from(datedItems)
  .groupBy(
    item => item.date,
    item => item.id,
    (date, group) => ({ date, ids: group.toJoinedString(',') }),
  )
  .log(group => `${group.date.toISOString()}:${group.ids}`)
  .force();

console.log('------');

// The fourth argument selects a comparable value for each key.
Enumerable.from(datedItems)
  .groupBy(
    item => item.date,
    item => item.id,
    (date, group) => ({ date, ids: group.toJoinedString(',') }),
    date => date.getTime(),
  )
  .log(group => `${group.date.toISOString()}:${group.ids}`)
  .force();

console.log('\n# Regular expression matches\n');

const input = 'abcdefgABzDefabgdg';
Enumerable.matches(input, /ab(.)d/gi).forEach(match => {
  for (const [property, value] of Object.entries(match)) {
    console.log(`${property} : ${value}`);
  }

  console.log(`toString() : ${match.toString()}`);
  console.log('---');
});

console.log('\n# Lazy evaluation and infinite sequences\n');

// Find the first radius of a circle whose area is greater than 10,000.
const radius = Enumerable.toInfinity(1)
  .where(value => value * value * Math.PI > 10_000)
  .first();

console.log(radius);

console.log('\n# Dictionary\n');

class SampleKey {
  readonly name: string;
  readonly value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

const firstKey = new SampleKey('a', 100);
const secondKey = new SampleKey('b', 2_000);

const dictionary = Enumerable
  .empty<{ key: SampleKey; value: string }>()
  .toDictionary(
    entry => entry.key,
    entry => entry.value,
    key => `${key.name}:${key.value}`,
  );

dictionary.add(firstKey, 'zzz');
dictionary.add(secondKey, 'huga');

console.log(dictionary.get(firstKey));
console.log(dictionary.get(secondKey));

dictionary.toEnumerable().forEach(entry => {
  console.log(`${entry.key.name}:${entry.value}`);
});

console.log('\n# Nondeterministic programs\n');

// A puzzle from Structure and Interpretation of Computer Programs.
const floors = Enumerable.range(1, 5);
const answers = floors
  .selectMany(baker => floors
    .selectMany(cooper => floors
      .selectMany(fletcher => floors
        .selectMany(miller => floors
          .select(smith => ({
            baker,
            cooper,
            fletcher,
            miller,
            smith,
          }))))))
  .where(answer => (
    Enumerable.from(Object.values(answer)).distinct().count() === 5
  ))
  .where(answer => answer.baker !== 5)
  .where(answer => answer.cooper !== 1)
  .where(answer => answer.fletcher !== 1 && answer.fletcher !== 5)
  .where(answer => answer.miller > answer.cooper)
  .where(answer => Math.abs(answer.smith - answer.fletcher) !== 1)
  .where(answer => Math.abs(answer.fletcher - answer.cooper) !== 1);

answers
  .selectMany(answer => Enumerable.from(answer))
  .log(entry => `${entry.key}:${entry.value}`)
  .force();
