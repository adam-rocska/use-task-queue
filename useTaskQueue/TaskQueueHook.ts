import TaskError from './TaskError';
import {TaskOutput} from './TaskOutput';
import {TaskProcess} from './TaskProcess';

export interface TaskQueueHook<I, O> {
  readonly input: readonly I[];
  readonly process: readonly TaskProcess<I, O>[];
  readonly output: readonly TaskOutput<I, O>[];
  readonly error: readonly TaskError<I, O>[];
  readonly push: (input: I | I[]) => void;
  readonly kill: (process: TaskProcess<I, O>) => void;
}

export function isTaskQueueHook<I, O>(
  value: object
): value is TaskQueueHook<I, O> {
  if (value === null) return false;
  const candidate = value as TaskQueueHook<I, O>;
  if (!Array.isArray(candidate.input)) return false;
  if (!Array.isArray(candidate.process)) return false;
  if (!Array.isArray(candidate.output)) return false;
  if (!Array.isArray(candidate.error)) return false;
  if (typeof candidate.push !== 'function') return false;
  if (typeof candidate.kill !== 'function') return false;
  return true;
}
