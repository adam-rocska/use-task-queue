export type TaskOutput<I, O> = {readonly input: I; readonly output: O};

export function isTaskOutput<I, O>(value: object): value is TaskOutput<I, O> {
  if (!('input' in value)) return false;
  if (!('output' in value)) return false;
  return true;
}
