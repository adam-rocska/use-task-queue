import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import {
  nullTaskQueue,
  TaskQueueHook,
  useTaskQueue,
} from '@21gram-consulting/use-task-queue';
import {json} from '@21gram-consulting/ts-codec';

type Props = PropsWithChildren<unknown>;
export type ContextValue = {
  task1: TaskQueueHook<number, number>;
  task2: TaskQueueHook<number, string>;
  task3: TaskQueueHook<string, string[]>;
};

const ReproContext = createContext<ContextValue>({
  task1: nullTaskQueue(),
  task2: nullTaskQueue(),
  task3: nullTaskQueue(),
});

export function useReproContext(): ContextValue {
  return useContext(ReproContext);
}
export const ReproProvider: FunctionComponent<Props> = props => {
  const task1 = useTaskQueue({
    name: 'task1',
    codec: json.number,
    task: v => [v, v * 2],
  });
  const task2 = useTaskQueue({
    name: 'task2',
    codec: json.number,
    input: task1,
    task: v => [v.toString()],
  });
  const task3 = useTaskQueue({
    name: 'task3',
    codec: json.string,
    input: task2,
    task: v => [v.split('')],
  });
  return (
    <ReproContext.Provider
      value={{
        task1,
        task2,
        task3,
      }}
    >
      {props.children}
    </ReproContext.Provider>
  );
};
