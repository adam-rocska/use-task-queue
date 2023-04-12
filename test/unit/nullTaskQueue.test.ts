import {nullTaskQueue} from '#nullTaskQueue';
import {isTaskQueueHook} from '#TaskQueueHook';

describe('nullTaskQueue', () => {
  it('should return a new TaskQueueHook', () => {
    const queue = nullTaskQueue();
    expect(isTaskQueueHook(queue)).toBe(true);
  });
});