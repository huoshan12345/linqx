import { expect, test } from 'vitest';

function deepEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).toEqual(expected);
}

function strictEqual(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).toBe(expected);
}

function equal(actual: unknown, expected: unknown, message?: string): void {
  expect(actual, message).toBe(expected);
}

function ok(condition: unknown, message?: string): void {
  expect(condition, message).toBe(true);
}

export { deepEqual, equal, ok, strictEqual, test };
