/**
 * @jest-environment jsdom
 */
import {act, renderHook} from '@testing-library/react';
import useTaskQueue from '!src/useTaskQueue';
import {descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';
import {TaskQueueHook} from '!src/TaskQueueHook';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

type RenderedHook = ReturnType<
  typeof renderHook<void, TaskQueueHook<number, number>>
>;

describe('Simple task piping.', () => {
  let first: RenderedHook;
  let second: RenderedHook;
  let third: RenderedHook;
  let resolveSecond: (value: number[]) => void;
  const secondPromise = new Promise<number[]>(r => (resolveSecond = r));

  beforeEach(() => {
    first = renderHook(() =>
      useTaskQueue({name: 'double', codec: json.number, task: v => [v * 2]})
    );

    second = renderHook(() =>
      useTaskQueue({
        name: 'double',
        codec: json.number,
        input: first.result.current,
        task: () => secondPromise,
      })
    );

    third = renderHook(() =>
      useTaskQueue({
        name: 'incrementalSpread',
        codec: json.number,
        input: second.result.current,
        task: v => [v, v + 1, v + 2, v + 3],
      })
    );

    first.rerender();
    second.rerender();
    third.rerender();
  });

  test('Straightforward happy path.', async () => {
    act(() => first.result.current.push(2));

    expect(first.result.current).toBeInState({
      input: [],
      process: [],
      output: [{input: 2, output: 4}],
      error: [],
    });

    second.rerender();
    expect(first.result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [],
    });
    expect(second.result.current).toBeInState({
      input: [],
      process: [{input: 4, task: secondPromise}],
      output: [],
      error: [],
    });
    resolveSecond([1, 2, 3, 4]);
    await second.waitForNextUpdate();
    expect(second.result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 4, output: 1},
        {input: 4, output: 2},
        {input: 4, output: 3},
        {input: 4, output: 4},
      ],
      error: [],
    });

    expect(third.result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [],
    });

    third.rerender();
    expect(first.result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [],
    });
    expect(second.result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [],
    });
    expect(third.result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 4, output: 4},
        {input: 4, output: 5},
        {input: 4, output: 6},
        {input: 4, output: 7},
        {input: 3, output: 3},
        {input: 3, output: 4},
        {input: 3, output: 5},
        {input: 3, output: 6},
        {input: 2, output: 2},
        {input: 2, output: 3},
        {input: 2, output: 4},
        {input: 2, output: 5},
        {input: 1, output: 1},
        {input: 1, output: 2},
        {input: 1, output: 3},
        {input: 1, output: 4},
      ],
      error: [],
    });
  });
});
