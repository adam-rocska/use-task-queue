import {TaskQueueHook, useTaskQueue} from '@adam-rocska/use-task-queue';
import {json} from '@adam-rocska/ts-codec';

export default function useTask2(
  input: TaskQueueHook<any, number>
): TaskQueueHook<number, string> {
  return useTaskQueue({
    name: 'task2',
    codec: json.number,
    input: input,
    task: v => [v.toString()],
    precondition: v => v % 2 === 0,
  });
}
