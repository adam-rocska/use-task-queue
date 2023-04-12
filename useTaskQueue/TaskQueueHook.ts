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
};

export function isTaskQueueHook<I,O>(value: object): value is TaskQueueHook<I,O> {
  return true;
}