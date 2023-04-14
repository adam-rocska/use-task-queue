/**
 * @jest-environment jsdom
 */
import {descriptors} from '#consistencyGuard';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ReproApp from './ReproApp';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Hook Reevaluation due to task recreation:', () => {
  test("shouldn't end up in an infinite loop when a failure occurs.", async () => {
    render(<ReproApp />);
    let repetition = 50;
    while (repetition--) {
      await userEvent.click(screen.getByText('Reproduce Bug'));
    }
    await screen.findByTestId('output');

    expect(screen.getByTestId('output')).toHaveTextContent('For an input');
  });
});
