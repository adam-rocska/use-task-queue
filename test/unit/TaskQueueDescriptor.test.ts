import {TaskQueueDescriptor} from '#TaskQueueDescriptor';
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
});