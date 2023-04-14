import {FunctionComponent} from 'react';
import {ReproProvider} from './ReproContext';
import OngoingTasks from './OngoingTasks';

const ReproApp: FunctionComponent = function ReproApp() {
  return (
    <ReproProvider>
      <OngoingTasks />
    </ReproProvider>
  );
};

export default ReproApp;
