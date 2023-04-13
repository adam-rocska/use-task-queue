import {renderHook} from '@testing-library/react-hooks/server';
import useTaskQueue from '#useTaskQueue';
import {descriptors} from '#consistencyGuard';
import {json} from '@21gram-consulting/ts-codec';

beforeEach(() => {
  descriptors.clear();
});
afterEach(() => {
  jest.clearAllMocks();
});

it('Hook created with a clean state, and nothing to recover from storage.', () => {
  const {result} = renderHook(() =>
    useTaskQueue({
      name: 'test',
      codec: json.string,
      task: v => [v],
    })
  );
  const hook = result.current;
  expect(hook.input.length).toBe(0);
  expect(hook.process.length).toBe(0);
  expect(hook.output.length).toBe(0);
  expect(hook.error.length).toBe(0);
});
