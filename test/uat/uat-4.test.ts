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

describe('Simple hook precondition failure', () => {
  test('Produces a simple precondition failure for a synchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
        precondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 2, undefined)],
    });
  });

  test('Produces a reasoned precondition failure for a synchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
        precondition: () => {
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
      error: [new TaskError('test', 'Precondition failed.', 2, error)],
    });

    expect(taskError);
  });

  test('Produces a simple precondition failure for a asynchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: async v => [v * 2],
        precondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 2, undefined)],
    });
  });

  test('Produces a reasoned precondition failure for a asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: async v => [v * 2],
        precondition: () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 2, error)],
    });
  });

  test('Produces a simple precondition failure for a cancellable asynchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => pseudoCancellable(Promise.resolve([v * 2])),
        precondition: () => false,
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 2, undefined)],
    });
  });

  test('Produces a reasoned precondition failure for a cancellable asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => pseudoCancellable(Promise.resolve([v * 2])),
        precondition: () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 2, error)],
    });
  });
});
