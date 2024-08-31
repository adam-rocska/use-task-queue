import {isNullTaskQueue, nullTaskQueue} from '!src/nullTaskQueue';
import {isTaskQueueHook} from '!src/TaskQueueHook';

describe('nullTaskQueue', () => {
  describe('.nullTaskQueue()', () => {
    it('should return a new TaskQueueHook', () => {
      const queue = nullTaskQueue();
      expect(isTaskQueueHook(queue)).toBe(true);
    });

    it('should return a TaskQueueHook with all null fields.', () => {
      const queue = nullTaskQueue<number, number>();
      queue.push(123);
      expect(queue.input).toEqual([]);
      expect(queue.process).toEqual([]);
      expect(queue.output).toEqual([]);
      expect(queue.error).toEqual([]);
      queue.kill({} as any);
      expect(queue.process).toEqual([]);
    });
  });

  describe('.isNullTaskQueue()', () => {
    it('should return true for a null TaskQueueHook', () => {
      const queue = nullTaskQueue();
      expect(isNullTaskQueue(queue)).toBe(true);
    });

    it('should return false for a non-null TaskQueueHook', () => {
      expect(
        isNullTaskQueue({
          input: [],
          process: [],
          output: [],
          error: [],
          push: () => {
            throw new Error('Function not implemented.');
          },
          kill: () => {
            throw new Error('Function not implemented.');
          },
          flush: () => {
            throw new Error('Function not implemented.');
          },
        })
      ).toBe(false);
    });
  });
});
