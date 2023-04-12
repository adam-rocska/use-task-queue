export default class TaskError<I, O> extends Error {
  readonly name: string;
  readonly message: string;
  readonly input?: I;
  readonly error?: any;
  readonly output?: O;

  constructor(
    name: string,
    message: string,
    input?: I,
    error?: any,
    output?: O
  ) {
    super(`[TASK ERROR][${name}] - ${message}`);
    this.name = name;
    this.message = message;
    this.input = input;
    this.error = error;
    this.output = output;
  }
}
