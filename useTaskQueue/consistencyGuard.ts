import InconsistencyError from './InconsistencyError';
import {TaskQueueDescriptor} from './TaskQueueDescriptor';

export const descriptors = new Set<TaskQueueDescriptor<any, any>>();

export function consistencyGuard(descriptor: TaskQueueDescriptor<any, any>) {
  if (descriptors.has(descriptor)) return;
  for (const knownDescriptor of descriptors) {
    if (knownDescriptor.name !== descriptor.name) continue;
    // TODO: This fuckin' equality problem is a pain in the ass with JS. Revisit ASAP

    // if (deepEqual(descriptor, knownDescriptor)) continue;
    // We do everything we can to stop the show and let the developer know about inconsistency.
    const error = new InconsistencyError(knownDescriptor, descriptor);
    // console.error(error);
    // if (
    //   typeof dispatchEvent === 'function' &&
    //   typeof ErrorEvent === 'function'
    // ) {
    //   dispatchEvent(new ErrorEvent('InconsistencyError', {error}));
    // }
    // throw error;
    console.warn(error);
  }
  descriptors.add(descriptor);
}
