import { Reducer } from 'react';

import { MerchantApplicationFulfillmentNode } from '../gql/useMerchantApplicationFulfillmentQuery/types';

export type MerchantApplication = Omit<MerchantApplicationFulfillmentNode['node'], 'id'> & {
  id: number;
};

export type State = {
  step: 1 | 2 | 3 | 4 | 5 | 6;
  activeStep: 1 | 2 | 3 | 4 | 5 | 6;
  merchantApplication: MerchantApplication | null;
  isReady: boolean;
};

type StepFormPayload = {
  step: State['step'];
  activeStep: State['activeStep'];
};

type ActionType = 'SET_MOVE_STEP_FORM' | 'INIT_MERCHANT_APPLICATION';

type Action<T extends ActionType, P> = {
  type: T;
  payload: P;
};

type MoveStepForm = Action<'SET_MOVE_STEP_FORM', StepFormPayload>;
type MerchantApplicationState = Action<'INIT_MERCHANT_APPLICATION', MerchantApplication | null>;

export type ReducerAction = MoveStepForm | MerchantApplicationState;

export const defaultState: State = {
  step: 1,
  activeStep: 1,
  merchantApplication: {} as MerchantApplication,
  isReady: false,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'INIT_MERCHANT_APPLICATION': {
      return {
        ...state,
        merchantApplication: action.payload,
        isReady: true,
      };
    }
    case 'SET_MOVE_STEP_FORM': {
      return {
        ...state,
        step: action?.payload?.step,
        activeStep: action?.payload?.activeStep,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
