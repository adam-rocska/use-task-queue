export type TaskOutput<I, O> = {readonly input: I; readonly output: O};

export function isTaskOutput<I, O>(value: object): value is TaskOutput<I, O> {
  if (value.hasOwnProperty('input') === false) return false;
  if (value.hasOwnProperty('output') === false) return false;
  return true;
};