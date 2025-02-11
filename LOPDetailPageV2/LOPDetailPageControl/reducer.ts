import { Reducer } from 'react';

import { MerchantApplicationFulfillmentNode } from '../gql/useFulfillmentApplicationQuery/types';

export type MerchantApplicationLOP = Omit<MerchantApplicationFulfillmentNode['node'], 'id'> & {
  id: number;
};

export type State = {
  merchantApplicationLOP: MerchantApplicationLOP | null;
  isReady: boolean;
};

type ActionType = 'INIT_MERCHANT_APPLICATION_LOP';

type Action<T extends ActionType, P> = {
  type: T;
  payload: P;
};

type LOPState = Action<'INIT_MERCHANT_APPLICATION_LOP', MerchantApplicationLOP | null>;
export type ReducerAction = LOPState;

export const defaultState: State = {
  merchantApplicationLOP: {} as MerchantApplicationLOP,
  isReady: false,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'INIT_MERCHANT_APPLICATION_LOP': {
      return {
        ...state,
        merchantApplicationLOP: action.payload,
        isReady: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
