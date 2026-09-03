import { expect, test } from 'vitest';

function deepEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).toEqual(expected);
}

function notDeepEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).not.toEqual(expected);
}

function strictEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).toBe(expected);
}

function strictNotEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).not.toBe(expected);
}

function equal(actual: unknown, expected: unknown, message?: string): void {
  expect(actual == expected, message).toBe(true);
}

function notEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual != expected, message).toBe(true);
}

function ok(condition: unknown, message?: string): void {
  expect(condition == true, message).toBe(true);
}

export { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test };
