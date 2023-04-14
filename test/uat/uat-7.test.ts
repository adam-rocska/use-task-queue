import {act, renderHook} from '@testing-library/react-hooks';
import useTaskQueue from '#useTaskQueue';
import {descriptors} from '#consistencyGuard';
import {json} from '@21gram-consulting/ts-codec';
import {TaskQueueHook} from '#TaskQueueHook';
import TaskError from '#TaskError';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

type RenderedHook = ReturnType<
  typeof renderHook<void, TaskQueueHook<number, number>>
>;

describe('Simple hook result flush', () => {
  let result: RenderedHook['result'];
  let rerender: RenderedHook['rerender'];
  beforeEach(() => {
    const hook = renderHook(() =>
      useTaskQueue({
        name: 'test',
        codec: json.number,
        task: v => [v * 2],
        precondition: v => v % 2 === 0,
      })
    );
    result = hook.result;
    rerender = hook.rerender;

    rerender();
  });

  test('Flushes output queue.', async () => {
    act(() => result.current.push(2));
    act(() => result.current.push(3));
    act(() => result.current.push(4));
    act(() => {
      result.current.flush('output');
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [],
      error: [new TaskError('test', 'Precondition failed.', 3, undefined)],
    });
  });

  test('Flushes output queue selectively.', async () => {
    act(() => result.current.push(2));
    act(() => result.current.push(3));
    act(() => result.current.push(4));
    act(() => {
      result.current.flush('output', result.current.output[0]!);
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [{input: 4, output: 8}],
      error: [new TaskError('test', 'Precondition failed.', 3, undefined)],
    });
  });

  test('Flushes error queue.', async () => {
    act(() => result.current.push(2));
    act(() => result.current.push(3));
    act(() => result.current.push(4));
    act(() => {
      result.current.flush('error');
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 2, output: 4},
        {input: 4, output: 8},
      ],
      error: [],
    });
  });

  test('Flushes error queue selectively.', async () => {
    act(() => result.current.push(2));
    act(() => result.current.push(3));
    act(() => result.current.push(4));
    act(() => result.current.push(5));
    act(() => {
      result.current.flush('error', result.current.error[0]!);
    });

    expect(result.current).toBeInState({
      input: [],
      process: [],
      output: [
        {input: 2, output: 4},
        {input: 4, output: 8},
      ],
      error: [new TaskError('test', 'Precondition failed.', 5, undefined)],
    });
  });
});
