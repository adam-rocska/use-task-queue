import {Codec, isCodec} from '@21gram-consulting/ts-codec';
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

/**
 * @summary
 * Creates a descriptor for a task queue.
 * @description
 * This is a convenience function that allows you to create a descriptor for a task queue.
 * It's handy for use when manual typing is inconvenient.
 * @param descriptor - The descriptor to create.
 * @returns The typed descriptor, unchanged.
 * @typeParam I - The type of the input to the task queue.
 * @typeParam O - The type of the output of the task queue.
 */
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
