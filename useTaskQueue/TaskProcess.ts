import {CancellablePromise} from 'real-cancellable-promise';

export type TaskProcess<I, O> = {
  readonly input: I;
  task: CancellablePromise<O[]>;
};
