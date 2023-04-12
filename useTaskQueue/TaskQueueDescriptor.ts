import {Codec} from '@21gram-consulting/ts-codec';
import {TaskQueueHook} from './TaskQueueHook';
import {Task} from './Task';

export type TaskQueueDescriptor<I, O> = {
  readonly name: string;
  readonly codec: Codec<I>;
  readonly task: Task<I, O>;
  readonly input?: TaskQueueHook<I, O>;
  readonly precondition?: (input: I) => boolean;
  readonly postcondition?: (input: I, output: O) => boolean;
};

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
export const TaskQueueDescriptor = <I, O>(descriptor: TaskQueueDescriptor<I, O>) => descriptor;