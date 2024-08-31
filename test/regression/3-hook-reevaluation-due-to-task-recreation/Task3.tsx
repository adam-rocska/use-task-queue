import {FunctionComponent} from 'react';
import {TaskProcess} from '@adam-rocska/use-task-queue';
import {useReproContext} from './ReproContext';

const Task3: FunctionComponent = function Task3() {
  const context = useReproContext();
  return (
    <div>
      <h3>Task 1</h3>
      <div>
        {context.task3.process.map((process, index) => (
          <TaskItem
            {...process}
            key={index}
            cancel={() => context.task3.kill(process)}
          />
        ))}
      </div>
    </div>
  );
};

type TaskItemProps = TaskProcess<string, string[]> & {
  cancel: () => void;
};
const TaskItem: FunctionComponent<TaskItemProps> = props => {
  return (
    <div>
      <h4>Task Item</h4>
      <p>Processing input: {props.input}</p>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  );
};

export default Task3;
