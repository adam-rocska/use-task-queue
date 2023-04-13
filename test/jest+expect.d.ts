import {Expectations} from './expect.toBeInState';
import {TaskQueueHook} from '../useTaskQueue/TaskQueueHook';

declare global {
  namespace jest {
    interface Expect {
      toBeInState<I, O>(expectations: Expectations<TaskQueueHook<I, O>>): void;
    }
    interface Matchers<R> {
      toBeInState<I, O>(expectations: Expectations<TaskQueueHook<I, O>>): R;
    }
  }
}

export default undefined;
