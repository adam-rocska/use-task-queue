// import InconsistencyError from '!src/InconsistencyError';
import {TaskQueueDescriptor} from '!src/TaskQueueDescriptor';
import {consistencyGuard, descriptors} from '!src/consistencyGuard';
import {json} from '@adam-rocska/ts-codec';

describe('consistencyGuard', () => {
  const originalConsole = global.console;
  const originalDispatchEvent = global.dispatchEvent;
  const originalErrorEvent = global.ErrorEvent;
  beforeEach(() => descriptors.clear());
  afterEach(() => {
    global.console = originalConsole;
    global.dispatchEvent = originalDispatchEvent;
    global.ErrorEvent = originalErrorEvent;
  });

  it('should pass silently if the store is empty.', () => {
    consistencyGuard({
      name: 'test',
      codec: json.number,
      task: v => [v],
    });
  });

  it('should pass silently if the store already contains the same reference.', () => {
    const descriptor = TaskQueueDescriptor<number, number>({
      name: 'test',
      codec: json.number,
      task: v => [v],
    });
    consistencyGuard(descriptor);
    consistencyGuard(descriptor);
  });

  it('should pass silently for different consecutive calls.', () => {
    consistencyGuard({
      name: 'test-1',
      codec: json.number,
      task: v => [v],
    });
    consistencyGuard({
      name: 'test-2',
      codec: json.string,
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

  // TODO: Revisit this feature once the equality problem is resolved.
  // it('should throw if the store has a different descriptor.', () => {
  //   const knownDescriptor = TaskQueueDescriptor<number, number>({
  //     name: 'test',
  //     codec: json.number,
  //     task: v => [v],
  //   });
  //   const collidingDescriptor = TaskQueueDescriptor<number, number>({
  //     name: 'test',
  //     codec: json.number,
  //     task: v => [v, v],
  //   });

  //   global.console.error = jest.fn();
  //   global.dispatchEvent = jest.fn();
  //   const stubErrorEvent = {};
  //   global.ErrorEvent = jest.fn().mockReturnValueOnce(stubErrorEvent);

  //   consistencyGuard(knownDescriptor);
  //   const expectedError = new InconsistencyError(
  //     knownDescriptor,
  //     collidingDescriptor
  //   );
  //   expect(() => consistencyGuard(collidingDescriptor)).toThrow(expectedError);
  //   expect(console.error).toHaveBeenCalledWith(expectedError);
  //   expect(global.dispatchEvent).toHaveBeenCalledWith(stubErrorEvent);
  //   expect(global.ErrorEvent).toHaveBeenCalledWith('InconsistencyError', {
  //     error: expectedError,
  //   });
  // });
});
