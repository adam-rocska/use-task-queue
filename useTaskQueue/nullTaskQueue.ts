import {TaskQueueHook} from './TaskQueueHook';

export function nullTaskQueue<I, O>(): TaskQueueHook<I, O> {
  return {
    input: nullQueue,
    process: nullQueue,
    output: nullQueue,
    error: nullQueue,
    push: noop,
    kill: noop,
  };
}

export function isNullTaskQueue<I, O>(queue: TaskQueueHook<I, O>): boolean {
  if (queue.input !== nullQueue) return false;
  if (queue.process !== nullQueue) return false;
  if (queue.output !== nullQueue) return false;
  if (queue.error !== nullQueue) return false;
  if (queue.push !== noop) return false;
  if (queue.kill !== noop) return false;
  return true;
}

const noop: (input: any) => void = () => {};
const nullQueue: readonly any[] = Object.freeze([]);
