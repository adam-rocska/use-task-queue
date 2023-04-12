import {consistencyGuard, descriptors} from '#consistencyGuard';
import {json} from '@21gram-consulting/ts-codec';

describe('consistencyGuard', () => {
  beforeEach(() => descriptors.clear());

  it('should pass silently if the store is empty.', () => {
    consistencyGuard({
      name: 'test',
      codec: json.number,
      task: v => [v],
    });
  });

  it('should pass silently if the store has the same descriptor.', () => {
    consistencyGuard({
      name: 'test',
      codec: json.number,
      task: v => [v],
    });
    consistencyGuard({
      name: 'test',
      codec: json.number,
      task: v => [v],
    });
  });
});
