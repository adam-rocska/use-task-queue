import {TaskQueueHook, useTaskQueue} from '@21gram-consulting/use-task-queue';
import {json} from '@21gram-consulting/ts-codec';

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
