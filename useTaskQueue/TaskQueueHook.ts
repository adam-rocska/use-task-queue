import TaskError from './TaskError';
import {TaskOutput} from './TaskOutput';
import {TaskProcess} from './TaskProcess';

export type TaskQueueHook<I, O> = {
  readonly input: I[];
  readonly process: TaskProcess<I, O>[];
  readonly output: TaskOutput<I, O>[];
  readonly error: TaskError<I, O>[];
  readonly push: (input: I | I[]) => void;
  readonly kill: (process: TaskProcess<I, O>) => void;
};
