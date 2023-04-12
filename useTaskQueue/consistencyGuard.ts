import InconsistencyError from './InconsistencyError';
import {TaskQueueDescriptor} from './TaskQueueDescriptor';

const descriptors = new Set<TaskQueueDescriptor<any, any>>();

export default function consistencyGuard(
  descriptor: TaskQueueDescriptor<any, any>
) {
  if (descriptors.has(descriptor)) return;
  for (const knownDescriptor of descriptors) {
    if (knownDescriptor.name !== descriptor.name) continue;
    // TODO: couldn't do any better. Object equality is still an issue in JS.
    const error = new InconsistencyError(knownDescriptor, descriptor);
    console.warn(error);
    // const error = new InconsistencyError(knownDescriptor, descriptor);
    // We did everything we could to stop the show and let the dev know that it's fucked.
    // console.error(error);
    // if (typeof window === 'object') {
    //   window.dispatchEvent(new ErrorEvent('InconsistencyError', {error}));
    // }
    // throw error;
  }
  descriptors.add(descriptor);
}
