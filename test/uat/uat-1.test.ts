/**
 * @jest-environment jsdom
 */
import {renderHook} from '@testing-library/react';
import useTaskQueue from '!src/useTaskQueue';
import {descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';

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
