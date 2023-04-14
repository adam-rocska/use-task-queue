import {TaskQueueHook, useTaskQueue} from '@21gram-consulting/use-task-queue';
import {json} from '@21gram-consulting/ts-codec';

export default function useTask1(): TaskQueueHook<number, number> {
  return useTaskQueue({
    name: 'task1',
    codec: json.number,
    task: v => {
      if (v % 3 === 0) throw new Error('Stub task execution error.');
      return [v, v * 2, v * 3];
    },
  });
}
