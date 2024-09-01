/**
 * @jest-environment jsdom
 */
import {act, renderHook, waitFor} from '@testing-library/react';
import useTaskQueue from '!src/useTaskQueue';
import {descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';
import {CancellablePromise} from 'real-cancellable-promise';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('Simple hook task execution, with multiple outputs', () => {
  test('Produces expected output for a synchronous task.', async () => {
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2, v * 3, v * 4],
      })
    );

    rerender();
    act(() => {
      result.current.push(2);
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 2, output: 4},
        {input: 2, output: 6},
        {input: 2, output: 8},
      ],
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

    resolve!([111, 222, 333]);
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 2, output: 111},
        {input: 2, output: 222},
        {input: 2, output: 333},
      ],
      error: [],
    });
  });

  test('Enqueues and keeps track of cancellable promise task.', async () => {
    let resolve: (value: number[]) => void;
    const promise = new CancellablePromise(
      new Promise<number[]>(r => (resolve = r)),
      console.error
    );
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

    resolve!([111, 222, 333]);
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 2, output: 111},
        {input: 2, output: 222},
        {input: 2, output: 333},
      ],
      error: [],
    });
  });
});
