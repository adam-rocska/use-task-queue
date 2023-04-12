import {TaskQueueHook} from './TaskQueueHook';

export function nullTaskQueue<I, O>(): TaskQueueHook<I, O> {
  return nullTaskQueueHook;
}

export function isNullTaskQueue<I, O>(queue: TaskQueueHook<I, O>): boolean {
  return queue === nullTaskQueueHook;
}

const noop: (input: any) => void = () => {};
const nullQueue: readonly any[] = Object.freeze([]);
const nullTaskQueueHook = {
  input: nullQueue,
  process: nullQueue,
  output: nullQueue,
  error: nullQueue,
  push: noop,
  kill: noop,
};
