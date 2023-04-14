import {FunctionComponent} from 'react';
import {ReproProvider} from './ReproContext';
import OngoingTasks from './OngoingTasks';
import Reproduce from './Reproduce';

const ReproApp: FunctionComponent = function ReproApp() {
  return (
    <ReproProvider>
      <OngoingTasks />
      <Reproduce />
    </ReproProvider>
  );
};

export default ReproApp;
