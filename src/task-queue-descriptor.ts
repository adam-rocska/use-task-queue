import {Codec, isCodec} from '@adam-rocska/ts-codec';
import {TaskQueueHook, isTaskQueueHook} from './TaskQueueHook';
import Task from './Task';

export interface TaskQueueDescriptor<I, O> {
  readonly name: string;
  readonly codec: Codec<I>;
  readonly task: Task<I, O>;
  readonly input?: TaskQueueHook<any, I>;
  readonly precondition?: (input: I) => boolean;
  readonly postcondition?: (input: I, output: O) => boolean;
}

export const TaskQueueDescriptor = <I, O>(
  descriptor: TaskQueueDescriptor<I, O>
) => descriptor;

export const isTaskQueueDescriptor = (
  value: object
): value is TaskQueueDescriptor<unknown, unknown> => {
  const candidate = value as TaskQueueDescriptor<unknown, unknown>;
  if (typeof candidate.name !== 'string') return false;
  if (!isCodec(candidate.codec)) return false;
  if (typeof candidate.task !== 'function') return false;
  if ('input' in candidate && !isTaskQueueHook(candidate.input)) return false;
  if (
    'precondition' in candidate &&
    typeof candidate.precondition !== 'function'
  )
    return false;
  if (
    'postcondition' in candidate &&
    typeof candidate.postcondition !== 'function'
  )
    return false;
  return true;
};
