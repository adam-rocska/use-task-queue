import {TaskQueueHook} from './TaskQueueHook';

export default function nullTaskQueue<I, O>(): TaskQueueHook<I, O> {
  return {
    input: [],
    process: [],
    output: [],
    error: [],
    push: () => {},
    kill: () => {},
  };
}
