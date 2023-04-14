/**
 * @jest-environment jsdom
 */
import {descriptors} from '#consistencyGuard';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReproApp from './ReproApp';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Hook Reevaluation due to task recreation:', () => {
  test("shouldn't end up in an infinite loop.", async () => {
    render(<ReproApp />);
  });
});
