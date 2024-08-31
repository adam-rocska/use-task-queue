import {TaskQueueHook, useTaskQueue} from '@adam-rocska/use-task-queue';
import {json} from '@adam-rocska/ts-codec';

export default function useTask3(
  input: TaskQueueHook<any, string>
): TaskQueueHook<string, string[]> {
  return useTaskQueue({
    name: 'task3',
    codec: json.string,
    input: input,
    task: v => [v.split('')],
    postcondition: v => v.length === 2,
  });
}
