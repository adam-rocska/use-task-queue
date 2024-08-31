import {PromiseWithCancel} from 'real-cancellable-promise';

export default interface Task<I, O> {
  (input: I): O[] | PromiseWithCancel<O[]> | Promise<O[]>;
}
