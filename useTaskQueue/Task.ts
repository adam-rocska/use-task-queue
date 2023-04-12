import {CancellablePromise} from 'real-cancellable-promise';

export default interface Task<I, O> {
  (input: I): O[] | CancellablePromise<O[]> | Promise<O[]>;
}
