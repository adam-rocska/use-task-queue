import {CancellablePromise} from 'real-cancellable-promise';

export type Task<I, O> = (input: I) => O[] | CancellablePromise<O[]>;
