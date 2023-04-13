import TaskError from '#TaskError';
import {TaskOutput} from '#TaskOutput';
import {TaskProcess} from '#TaskProcess';
import {TaskQueueHook} from '#TaskQueueHook';
// eslint-disable-next-line node/no-extraneous-import
import type {SyncExpectationResult} from 'expect';

export type Expectations<I, O> = {
  input: I[];
  process: TaskProcess<I, O>[];
  output: TaskOutput<I, O>[];
  error: TaskError<I, O>[];
};

export function toBeInState<I, O>(
  hook: TaskQueueHook<I, O>,
  expectations: Expectations<I, O>
): SyncExpectationResult {
  if (hook === null) {
    return {
      pass: false,
      message: () => 'Hook is null.',
    };
  }

  if (hook.input.length !== expectations.input.length) {
    return fail(
      'Input length mismatch.',
      hook.input.length,
      expectations.input.length
    );
  }
  if (hook.process.length !== expectations.process.length) {
    return fail(
      'Process length mismatch.',
      hook.process.length,
      expectations.process.length
    );
  }
  if (hook.error.length !== expectations.error.length) {
    return fail(
      'Error length mismatch.',
      hook.error.length,
      expectations.error.length
    );
  }

  for (let i = 0; i < expectations.process.length; i++) {
    if (hook.process[i]?.input !== expectations.process[i]?.input) {
      return fail(
        `Process input values at index ${i} don't match.`,
        hook.process[i]?.input,
        expectations.process[i]?.input
      );
    }
    if (hook.process[i]?.task !== expectations.process[i]?.task) {
      return fail(
        `Process task values at index ${i} don't match.`,
        hook.process[i]?.task,
        expectations.process[i]?.task
      );
    }
  }

  for (let i = 0; i < expectations.output.length; i++) {
    if (hook.output[i]?.input !== expectations.output[i]?.input) {
      return fail(
        `Output input values at index ${i} don't match.`,
        hook.output[i]?.input,
        expectations.output[i]?.input
      );
    }
    if (hook.output[i]?.output !== expectations.output[i]?.output) {
      return fail(
        `Output output values at index ${i} don't match.`,
        hook.output[i]?.output,
        expectations.output[i]?.output
      );
    }
  }

  for (let i = 0; i < expectations.error.length; i++) {
    const actualError = hook.error[i];
    const expectedError = expectations.error[i];
    if (actualError?.name !== expectedError?.name) {
      return fail(
        `Error name values at index ${i} don't match.`,
        actualError?.name,
        expectedError?.name
      );
    }
    if (actualError?.input !== expectedError?.input) {
      return fail(
        `Error input values at index ${i} don't match.`,
        actualError?.input,
        expectedError?.input
      );
    }
    if (actualError?.error !== expectedError?.error) {
      return fail(
        `Error error values at index ${i} don't match.`,
        actualError?.error,
        expectedError?.error
      );
    }
    if (actualError?.output !== expectedError?.output) {
      return fail(
        `Error output values at index ${i} don't match.`,
        actualError?.output,
        expectedError?.output
      );
    }
  }

  return {pass: true, message: () => 'Hook is in expected state.'};
}

const fail = (
  message: string,
  actual: any,
  expected: any
): SyncExpectationResult => ({
  pass: false,
  message: () => `${message}: Expected ${expected}, but got ${actual}.`,
});
