import {act, renderHook} from '@testing-library/react-hooks';
import useTaskQueue from '!src/useTaskQueue';
import {descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';
import TaskError from '!src/TaskError';
import {pseudoCancellable} from 'real-cancellable-promise';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Simple hook postcondition failure', () => {
  test('Produces a simple postcondition failure for a synchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
        postcondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, undefined, 4)],
    });
  });

  test('Produces a reasoned postcondition failure for a synchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
        postcondition: () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current.error[0]).toBeInstanceOf(TaskError);
    const taskError = result.current.error[0] as TaskError<number, number>;

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, error, 4)],
    });

    expect(taskError);
  });

  test('Produces a simple postcondition failure for a asynchronous task.', async () => {
    const {result, rerender, waitForNextUpdate} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: async v => [v * 2],
        postcondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, undefined, 4)],
    });
  });

  test('Produces a reasoned postcondition failure for a asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender, waitForNextUpdate} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: async v => [v * 2],
        postcondition: () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, error, 4)],
    });
  });

  test('Produces a simple postcondition failure for a cancellable asynchronous task.', async () => {
    const {result, rerender, waitForNextUpdate} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => pseudoCancellable(Promise.resolve([v * 2])),
        postcondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, undefined, 4)],
    });
  });

  test('Produces a reasoned postcondition failure for a cancellable asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender, waitForNextUpdate} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => pseudoCancellable(Promise.resolve([v * 2])),
        postcondition: () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Postcondition failed.', 2, error, 4)],
    });
  });
});
