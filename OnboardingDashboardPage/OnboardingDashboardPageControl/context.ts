import { createContext, Dispatch } from 'react';

import { ReducerAction, State } from './reducer';

export type OnboardingDashboardPageControlContextValue = {
  state: State;
  dispatch: Dispatch<ReducerAction>;
};

// @ts-expect-error returns `false`, the default value will be defined inside provider.
const Context = createContext<OnboardingDashboardPageControlContextValue>();

export default Context;
