import { useContext } from 'react';

import Context from './context';

export default function useOnboardingDashboardPageControl() {
  return useContext(Context);
}
