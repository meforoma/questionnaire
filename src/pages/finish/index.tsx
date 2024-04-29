import { FinishLayout } from '@@/layouts/FinishLayout';
import ReduxProvider from '@@/redux/provider';

export default function Finish() {
  return (
    <ReduxProvider>
      <FinishLayout />
    </ReduxProvider>
  );
};
