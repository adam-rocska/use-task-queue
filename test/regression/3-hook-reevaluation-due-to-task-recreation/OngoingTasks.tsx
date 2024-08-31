import {useReproContext} from './ReproContext';
import {FunctionComponent} from 'react';
import {TaskQueueHook} from '@adam-rocska/use-task-queue';
import Task1 from './Task1';
import Task2 from './Task2';
import Task3 from './Task3';

const OngoingTasks: FunctionComponent = function OngoingTasks() {
  const context = useReproContext();
  return (
    <div>
      <h1>Ongoing Tasks</h1>
      <div>
        <h2>{subTitle(context.task1)}</h2>
        <Task1 />
      </div>
      <div>
        <h2>{subTitle(context.task2)}</h2>
        <Task2 />
      </div>
      <div>
        <h2>{subTitle(context.task3)}</h2>
        <Task3 />
      </div>
    </div>
  );
};

const subTitle = <A, B>({
  input,
  process,
  error,
  output,
}: TaskQueueHook<A, B>): string =>
  [
    `${input.length} waiting to be picked up`,
    `${process.length} is processed.`,
    `${error.length} resolved as error`,
    `${output.length} result ready for pickup`,
  ]
    .join(', ')
    .concat('.');

export default OngoingTasks;
