import { PropsWithChildren, useReducer } from 'react';

import { useRouter } from 'next/router';

import urls from '@/utils/urls';

import Context from './context';
import reducer, { defaultState } from './reducer';
import { onboardingStatus } from '../../WarehouseApplicationsPage/constants';
import useMerchantApplicationFulfillmentQuery from '../gql/useFulfillmentApplicationQuery';

export type LOPDetailPageControlProps = PropsWithChildren;

export default function LOPDetailPageControl({ children }: LOPDetailPageControlProps) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const { push, query } = useRouter();
  const id = Number(query.id);

  useMerchantApplicationFulfillmentQuery({
    fetchPolicy: 'no-cache',
    variables: {
      payload: {
        id: [id],
        pagePagination: { sortBy: ['-created_at'], limit: 1 },
      },
    },
    onCompleted: ({ merchantApplicationFulfillment }) => {
      if (merchantApplicationFulfillment.edges?.length <= 0) {
        push(urls.external.shipper360.notFound);
        return;
      }
      const application = merchantApplicationFulfillment.edges?.[0]?.node;
      const applicationNotApproved = application.status < onboardingStatus?.ops_approved?.status;

      if (!application || applicationNotApproved) {
        push(urls.external.shipper360.notFound);
        return;
      }

      if (!merchantApplicationFulfillment?.edges?.length) {
        dispatch({ type: 'INIT_MERCHANT_APPLICATION_LOP', payload: null });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { __typename, ...values } = merchantApplicationFulfillment.edges[0].node;

      dispatch({
        type: 'INIT_MERCHANT_APPLICATION_LOP',
        payload: values,
      });
    },
    onError: () => {
      dispatch({ type: 'INIT_MERCHANT_APPLICATION_LOP', payload: null });
    },
  });

  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
