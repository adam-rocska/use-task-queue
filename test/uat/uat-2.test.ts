import {act, renderHook} from '@testing-library/react-hooks';
import useTaskQueue from '#useTaskQueue';
import {descriptors} from '#consistencyGuard';
import {json} from '@21gram-consulting/ts-codec';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Simple hook task execution', () => {
  test('Produces expected output for a synchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
      })
    );

    rerender();
    act(() => {
      result.current.push(2);
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [{input: 2, output: 4}],
      error: [],
    });
  });
});
