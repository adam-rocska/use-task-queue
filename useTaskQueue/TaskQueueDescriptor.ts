import {Codec} from '@21gram-consulting/ts-codec';
import {TaskQueueHook} from './TaskQueueHook';
import {Task} from './Task';

export type TaskQueueDescriptor<I, O> = {
  readonly name: string;
  readonly codec: Codec<I>;
  readonly input?: TaskQueueHook<I, O>;
  readonly task: Task<I, O>;
  readonly precondition?: (input: I) => boolean;
  readonly postcondition?: (input: I, output: O) => boolean;
};
