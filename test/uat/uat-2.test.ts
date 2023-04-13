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

  test('Enqueues and keeps track of an asynchronous task.', async () => {
    let resolve: (value: number[]) => void;
    const promise = new Promise<number[]>(r => (resolve = r));
    const {result, rerender, waitForNextUpdate} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: i => {
          expect(i).toBe(2);
          return promise;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [{input: 2, task: promise!}],
      output: [],
      error: [],
    });

    resolve!([555]);
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [{input: 2, output: 555}],
      error: [],
    });
  });
});
