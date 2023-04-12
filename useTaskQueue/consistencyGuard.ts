import deepEqual from 'deep-equal';
import InconsistencyError from './InconsistencyError';
import {TaskQueueDescriptor} from './TaskQueueDescriptor';

const descriptors = new Set<TaskQueueDescriptor<any, any>>();

export default function consistencyGuard(
  descriptor: TaskQueueDescriptor<any, any>
) {
  if (descriptors.has(descriptor)) return;
  for (const knownDescriptor of descriptors) {
    if (knownDescriptor.name !== descriptor.name) continue;
    if (deepEqual(descriptor, knownDescriptor)) continue;
    // We do everything we can to stop the show and let the developer know about inconsistency.
    const error = new InconsistencyError(knownDescriptor, descriptor);
    console.warn(error);
    console.error(error);
    if (typeof window === 'object') {
      window.dispatchEvent(new ErrorEvent('InconsistencyError', {error}));
    }
    throw error;
  }
  descriptors.add(descriptor);
}
