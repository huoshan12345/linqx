import { beforeEach, vi, afterEach } from "vitest";
import "../index.js";

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});
