import {isTaskQueueHook} from '#TaskQueueHook';
import {nullTaskQueue} from '#nullTaskQueue';

describe('TaskQueueHook', () => {
  it('should return a new TaskQueueHook', () => {
    const queue = nullTaskQueue();
    expect(isTaskQueueHook(queue)).toBe(true);
  });
});
