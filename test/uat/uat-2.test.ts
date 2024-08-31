import {act, renderHook} from '@testing-library/react-hooks';
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

describe('Simple hook task execution, with single output', () => {
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

  test("Can't kill a non cancellable process.", async () => {
    const promise = new Promise<number[]>(() => {});
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: () => promise,
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

    act(() => result.current.kill(result.current.process[0]!));

    expect(result.current).toBeInState({
      input: [],
      process: [{input: 2, task: promise!}],
      output: [],
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

    resolve!([555]);
    await waitForNextUpdate();

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [{input: 2, output: 555}],
      error: [],
    });
  });

  test('Can kill a cancellable process.', async () => {
    const cancellation = jest.fn();
    const promise = new CancellablePromise(
      new Promise<number[]>(() => {}),
      cancellation
    );
    const {result, rerender} = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: () => promise,
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

    act(() => result.current.kill(result.current.process[0]!));

    expect(cancellation).toHaveBeenCalledTimes(1);
    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [],
    });
  });
});
