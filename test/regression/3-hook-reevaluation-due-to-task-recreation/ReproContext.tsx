import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react';
import {nullTaskQueue, TaskQueueHook} from '@21gram-consulting/use-task-queue';
import useTask1 from './useTask1';
import useTask2 from './useTask2';
import useTask3 from './useTask3';

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
  const task1 = useTask1();
  const task2 = useTask2(task1);
  const task3 = useTask3(task2);
  return (
    <ReproContext.Provider value={{task1, task2, task3}}>
      {props.children}
    </ReproContext.Provider>
  );
};
