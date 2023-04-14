import {FunctionComponent} from 'react';
import {TaskProcess} from '@21gram-consulting/use-task-queue';
import {useReproContext} from './ReproContext';

const Task1: FunctionComponent = function Task1() {
  const context = useReproContext();
  return (
    <div>
      <h3>Task 1</h3>
      <div>
        {context.task1.process.map((process, index) => (
          <TaskItem
            {...process}
            key={index}
            cancel={() => context.task1.kill(process)}
          />
        ))}
      </div>
    </div>
  );
};

type TaskItemProps = TaskProcess<number, number> & {
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

export default Task1;
