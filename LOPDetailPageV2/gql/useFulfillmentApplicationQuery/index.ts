import { gql, LazyQueryHookOptions, useQuery } from '@apollo/client';

import { FulfillmentApplicationQueryData, FulfillmentApplicationQueryVariables } from './types';

export const QUERY_MERCHANT_APPLICATION_LOP = gql`
  query LOPDetailPage($payload: GetMerchantApplicationFulfillmentInput) {
    merchantApplicationFulfillment(p: $payload) {
      edges {
        node {
          id
          companyName
          picName
          picPhone
          picEmail
          picPosition
          financeEmail
          businessEntity
          nib
          companyAddress
          status
        }
      }
    }
  }
`;

export default function useMerchantApplicationFulfillmentQuery(
  options?: LazyQueryHookOptions<
    FulfillmentApplicationQueryData,
    FulfillmentApplicationQueryVariables
  >,
) {
  return useQuery<FulfillmentApplicationQueryData, FulfillmentApplicationQueryVariables>(
    QUERY_MERCHANT_APPLICATION_LOP,
    options,
  );
}
