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

    const hook = result.current;
    expect(hook.input.length).toBe(0);
    expect(hook.process.length).toBe(0);
    expect(hook.output.length).toBe(1);
    expect(hook.error.length).toBe(0);

    const output = hook.output[0]!;
    expect(output.input).toBe(2);
    expect(output.output).toBe(4);
  });
});
