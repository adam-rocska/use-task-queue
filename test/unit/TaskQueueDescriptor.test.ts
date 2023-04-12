import buildStubRecords from '!buildStubRecords';
import {TaskQueueDescriptor, isTaskQueueDescriptor} from '#TaskQueueDescriptor';
import {json} from '@21gram-consulting/ts-codec';

describe('TaskQueueDescriptor', () => {
  describe('.TaskQueueDescriptor()', () => {
    it('should return the descriptor unchanged', () => {
      const descriptor: TaskQueueDescriptor<number, number> = {
        name: 'test',
        codec: json.number,
        task: i => [i],
      };
      expect(TaskQueueDescriptor(descriptor)).toBe(descriptor);
    });
  });

  describe('.isTaskQueueDescriptor()', () => {
    const invalidDescriptors = buildStubRecords({
      name: [1, true, false, null, undefined, {}, [], {}, () => {}],
      codec: [1, true, false, null, undefined, 'string', [], {}, () => {}],
      task: [1, true, false, null, undefined, 'string', [], {}],
    });

    const validDescriptors = buildStubRecords({
      name: ['test'],
      codec: [json.number],
      task: [(i: number) => [i], async (i: number) => [i]],
      input: [undefined, nullTaskQueue],
    });

    it('should return true if the value is a TaskQueueDescriptor', () => {
      const descriptor: TaskQueueDescriptor<number, number> = {
        name: 'test',
        codec: json.number,
        task: i => [i],
      };
      expect(isTaskQueueDescriptor(descriptor)).toBe(true);
    });

    it('should return false if the value is not a TaskQueueDescriptor', () => {
      expect(isTaskQueueDescriptor({})).toBe(false);
    });
  });
});
