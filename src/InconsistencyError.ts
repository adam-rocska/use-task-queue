import {TaskQueueDescriptor} from './task-queue-descriptor';

export default class InconsistencyError extends Error {
  readonly knownDescriptor: TaskQueueDescriptor<any, any>;
  readonly mismatchingDescriptor: TaskQueueDescriptor<any, any>;

  constructor(
    knownDescriptor: TaskQueueDescriptor<any, any>,
    mismatchingDescriptor: TaskQueueDescriptor<any, any>
  ) {
    super(
      `🚨 Inconsistent task queue descriptors for task queue "${knownDescriptor.name}".`
    );
    this.knownDescriptor = knownDescriptor;
    this.mismatchingDescriptor = mismatchingDescriptor;
  }
}
