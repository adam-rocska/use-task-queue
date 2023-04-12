import {useCallback, useEffect, useMemo, useState} from 'react';
import removeFrom from './removeFrom';
import popFrom from './popFrom';
import pushTo from './pushTo';
import TaskError from './TaskError';
import {TaskQueueHook} from './TaskQueueHook';
import {TaskOutput} from './TaskOutput';
import {TaskQueueDescriptor} from './TaskQueueDescriptor';
import {consistencyGuard} from './consistencyGuard';
import {TaskProcess} from './TaskProcess';
import {CancellablePromise} from 'real-cancellable-promise';

export default function useTaskQueue<I, O>(
  descriptor: TaskQueueDescriptor<I, O>
): TaskQueueHook<I, O> {
  consistencyGuard(descriptor);
  type GetPreconditionFailure = (i: I) => TaskError<I, O> | void;
  type GetPostconditionFailure = (i: I, o: O) => TaskError<I, O> | void;

  const name = useMemo(() => descriptor.name, [descriptor.name]);
  const task = useMemo(() => descriptor.task, [descriptor.task]);
  // TODO: Codec to be used for persistence.
  // const codec = useMemo(
  //   () => (descriptor.codec ? json.array(descriptor.codec) : undefined),
  //   [descriptor.codec]
  // );
  const precondition = useMemo(
    () => descriptor.precondition ?? (() => true),
    [descriptor.precondition]
  );
  const postcondition = useMemo(
    () => descriptor.postcondition ?? (() => true),
    [descriptor.postcondition]
  );

  const getPreconditionFailure = useCallback<GetPreconditionFailure>(
    input => {
      let error: any;
      try {
        if (precondition(input)) return;
      } catch (e) {
        error = e;
      }
      return new TaskError(name, 'Precondition failed.', input, error);
    },
    [name, precondition]
  );
  const getPostconditionFailure = useCallback<GetPostconditionFailure>(
    (input, output) => {
      let error: any;
      try {
        if (postcondition(input, output)) return;
      } catch (e) {
        error = e;
      }
      return new TaskError(name, 'Postcondition failed.', input, error, output);
    },
    [name, postcondition]
  );
  const [input, setInput] = useState<I[]>([]);
  const [processing, setProcessing] = useState<TaskProcess<I, O>[]>([]);
  const [output, setOutput] = useState<TaskOutput<I, O>[]>([]);
  const [error, setError] = useState<TaskError<I, O>[]>([]);
  const push = useCallback<TaskQueueHook<I, O>['push']>(
    input => {
      if (!Array.isArray(input)) input = [input];
      const inputs: Array<I> = [];
      const errors: Array<TaskError<I, O>> = [];
      for (const i of input) {
        const error = getPreconditionFailure(i);
        error ? errors.push(error) : inputs.push(i);
      }
      pushTo(setError, errors);
      pushTo(setInput, inputs);
    },
    [getPreconditionFailure]
  );
  const kill = useCallback<TaskQueueHook<I, O>['kill']>(process => {
    if (!processing.includes(process)) return;
    if (process.task instanceof Promise) return;
    removeFrom(setProcessing, process);
  }, []);

  useEffect(() => {
    const popped = popFrom(setInput, input);
    if (!popped) return;
    const taskInput = popped as I;

    let results: ReturnType<typeof task>;
    try {
      results = task(taskInput);
    } catch (error) {
      pushTo(setError, [new TaskError(name, 'Task failed.', taskInput, error)]);
      return;
    }

    const reduceResults = (results: O[]) => {
      const errors: Array<TaskError<I, O>> = [];
      const outputs: Array<TaskOutput<I, O>> = [];
      for (const result of results) {
        const error = getPostconditionFailure(taskInput, result);
        error
          ? errors.push(error)
          : outputs.push({input: taskInput, output: result});
      }
      pushTo(setError, errors);
      pushTo(setOutput, outputs);
    };

    if (results instanceof CancellablePromise || results instanceof Promise) {
      const process: TaskProcess<I, O> = {input: taskInput, task: results};
      pushTo(setProcessing, [process]);
      results
        .then(reduceResults)
        .catch(error =>
          pushTo(setError, [
            new TaskError(name, 'Task failed.', taskInput, error),
          ])
        )
        .finally(() => removeFrom(setProcessing, process));
      return;
    } else {
      reduceResults(results);
    }
  }, [getPostconditionFailure, input, name, task]);

  return {input, process: processing, output, error, push, kill};
}
