export interface Task<I, O> {
  (input: I): O[] | Promise<O[]>;
}
