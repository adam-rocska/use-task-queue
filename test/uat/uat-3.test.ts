/**
 * @jest-environment jsdom
 */
import {act, renderHook, waitFor} from '@testing-library/react';
import useTaskQueue from '!src/useTaskQueue';
import {descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';
import TaskError from '!src/TaskError';
import {CancellablePromise} from 'real-cancellable-promise';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Simple hook task failure', () => {
  test('Produces expected error for a synchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: () => {
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
      error: [new TaskError('test', '', 2, error, undefined)],
    });
  });

  test('Produces expected error for a asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: async () => {
          throw error;
        },
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitFor(() => {
      expect(result.current).toBeInState({
        input: [],
        process: [],
        output: [],
        error: [new TaskError('test', '', 2, error, undefined)],
      });
    });
  });

  test('Produces expected error for a cancellable asynchronous task.', async () => {
    const error = new Error('test');
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: () =>
          new CancellablePromise(
            new Promise<number[]>((_, reject) => reject(error)),
            () => {}
          ),
      })
    );

    rerender();
    act(() => result.current.push(2));
    await waitFor(() => {
      expect(result.current).toBeInState({
        input: [],
        process: [],
        output: [],
        error: [new TaskError('test', '', 2, error, undefined)],
      });
    });
  });
});
