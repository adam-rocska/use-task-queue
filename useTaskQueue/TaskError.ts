export default class TaskError<I, O> extends Error {
  readonly taskName: string;
  readonly input?: I;
  readonly error?: any;
  readonly output?: O;

  constructor(
    taskName: string,
    message: string,
    input?: I,
    error?: any,
    output?: O
  ) {
    super(`[TASK ERROR][${taskName}] - ${message}`);
    this.taskName = taskName;
    this.message = message;
    if (input !== undefined) this.input = input;
    if (error !== undefined) this.error = error;
    if (output !== undefined) this.output = output;
  }
}
