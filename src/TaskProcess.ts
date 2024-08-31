import {PromiseWithCancel, isPromiseWithCancel} from 'real-cancellable-promise';

export interface TaskProcess<I, O> {
  readonly input: I;
  task: Promise<O[]> | PromiseWithCancel<O[]>;
}

export function isTaskProcess<I, O>(value: object): value is TaskProcess<I, O> {
  const candidate = value as TaskProcess<I, O>;
  if (!('input' in value)) return false;
  if (!('task' in value)) return false;
  return (
    isPromiseWithCancel(candidate.task) || candidate.task instanceof Promise
  );
}
