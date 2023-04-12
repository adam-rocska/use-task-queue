export type TaskOutput<I, O> = {readonly input: I; readonly output: O};

export function isTaskOutput<I, O>(value: object): value is TaskOutput<I, O> {
  if (!value.hasOwnProperty('input')) return false;
  if (!value.hasOwnProperty('output')) return false;
  return true;
};