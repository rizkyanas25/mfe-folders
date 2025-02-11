import { PropsWithChildren, useReducer } from 'react';

import Context from './context';
import reducer, { defaultState } from './reducer';
import { merchantApplicationStatus } from '../constants';
import useMerchantApplicationFulfillmentQuery from '../gql/useMerchantApplicationFulfillmentQuery';

export type OnboardingDashboardPageControlProps = PropsWithChildren;

export default function OnboardingDasboardPageControl({
  children,
}: OnboardingDashboardPageControlProps) {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useMerchantApplicationFulfillmentQuery({
    fetchPolicy: 'no-cache',
    variables: {
      payload: {
        pagePagination: { sortBy: ['-created_at'], limit: 1 },
      },
    },
    onCompleted: ({ merchantApplicationFulfillment }) => {
      if (!merchantApplicationFulfillment?.edges?.length) {
        dispatch({ type: 'INIT_MERCHANT_APPLICATION', payload: null });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...application } = merchantApplicationFulfillment.edges[0].node;
      const { status: merchantApplicationFulfillmentStatus } = application;

      dispatch({
        type: 'INIT_MERCHANT_APPLICATION',
        payload: { ...application, id: Number(application.id) },
      });

      // Define step completion conditions
      const isCompletedStep1 = Boolean(
        application.productCategory &&
          application.outboundOrdersMonthly &&
          application.numbersOfSKU &&
          application.maxProductHeight &&
          application.maxProductLength &&
          application.maxProductWidth &&
          application.averageGoodsValue &&
          application.averageOrderValue &&
          application.numberOfItemsEachOutbound &&
          application.cityID,
      );

      const isCompletedStep2 = Boolean(application.warehouseCode);

      const isCompletedStep4 = Boolean(
        application.firstInboundDate && application.firstOutboundDate,
      );

      // Single conditional flow handling all scenarios
      if (
        merchantApplicationFulfillmentStatus ===
        merchantApplicationStatus.warehouseApplicationAccepted
      ) {
        dispatch({
          type: 'SET_MOVE_STEP_FORM',
          payload: { step: 6, activeStep: 6 },
        });
      } else if (isCompletedStep4) {
        dispatch({
          type: 'SET_MOVE_STEP_FORM',
          payload: { step: 5, activeStep: 5 },
        });
      } else if (
        merchantApplicationFulfillmentStatus === merchantApplicationStatus.kycSuccess &&
        application.dealID
      ) {
        dispatch({
          type: 'SET_MOVE_STEP_FORM',
          payload: { step: 4, activeStep: 4 },
        });
      } else if (
        (merchantApplicationFulfillmentStatus === merchantApplicationStatus.kycSuccess &&
          !application.dealID) ||
        merchantApplicationFulfillmentStatus === merchantApplicationStatus.kycVerifying ||
        merchantApplicationFulfillmentStatus === merchantApplicationStatus.kycFailed ||
        isCompletedStep2
      ) {
        dispatch({
          type: 'SET_MOVE_STEP_FORM',
          payload: { step: 3, activeStep: 3 },
        });
      } else if (isCompletedStep1) {
        dispatch({
          type: 'SET_MOVE_STEP_FORM',
          payload: { step: 2, activeStep: 2 },
        });
      }
    },
    onError: () => {
      dispatch({
        type: 'INIT_MERCHANT_APPLICATION',
        payload: null,
      });
    },
  });
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
