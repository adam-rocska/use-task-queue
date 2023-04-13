import {renderHook} from '@testing-library/react-hooks';
import useTaskQueue from '#useTaskQueue';
import {descriptors} from '#consistencyGuard';
import {json} from '@21gram-consulting/ts-codec';

beforeEach(() => {
  descriptors.clear();
});

test('Hook created with a clean state, and nothing to recover from storage.', () => {
  const {result} = renderHook(() =>
    useTaskQueue({
      name: 'test',
      codec: json.string,
      task: v => [v],
    })
  );

  expect.extend({});

  expect(result.current).toBeInState({
    input: [],
    process: [],
    output: [],
    error: [],
  });
});
