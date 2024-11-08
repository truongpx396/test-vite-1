import '@testing-library/jest-dom';
import { beforeAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  // Setup any global test configuration
});

afterEach(() => {
  cleanup();
});