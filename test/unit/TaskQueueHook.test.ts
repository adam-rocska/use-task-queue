import buildStubRecords from '!buildStubRecords';
import {isTaskQueueHook} from '#TaskQueueHook';
import {nullTaskQueue} from '#nullTaskQueue';

describe('TaskQueueHook', () => {
  describe('.isTaskQueueHook()', () => {
    it('should return true for a task queue hook.', () => {
      const queue = nullTaskQueue();
      expect(isTaskQueueHook(queue)).toBe(true);
    });

    it('should return false for a non-task queue hook.', () =>
      [
        {},
        ...buildStubRecords({
          input: [1, true, undefined, 'string', {}, () => {}],
          process: [1, true, undefined, 'string', {}, () => {}],
          output: [1, true, undefined, 'string', {}, () => {}],
          error: [1, true, undefined, 'string', {}, () => {}],
          push: [1, true, undefined, 'string', {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [1, true, undefined, 'string', {}, () => {}],
          output: [1, true, undefined, 'string', {}, () => {}],
          error: [1, true, undefined, 'string', {}, () => {}],
          push: [1, true, undefined, 'string', {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [[]],
          output: [1, true, undefined, 'string', {}, () => {}],
          error: [1, true, undefined, 'string', {}, () => {}],
          push: [1, true, undefined, 'string', {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [[]],
          output: [[]],
          error: [1, true, undefined, 'string', {}, () => {}],
          push: [1, true, undefined, 'string', {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [[]],
          output: [[]],
          error: [[]],
          push: [1, true, undefined, 'string', {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [[]],
          output: [[]],
          error: [[]],
          push: [() => {}],
          kill: [1, true, undefined, 'string', {}],
        }),
        ...buildStubRecords({
          input: [[]],
          process: [[]],
          output: [[]],
          error: [[]],
          push: [() => {}],
          kill: [() => {}],
          flush: [1, true, undefined, 'string', {}],
        }),
      ].forEach(value => expect(isTaskQueueHook(value)).toBe(false)));
  });
});
