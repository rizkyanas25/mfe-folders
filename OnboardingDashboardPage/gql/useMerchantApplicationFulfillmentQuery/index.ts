import { gql, LazyQueryHookOptions, useQuery } from '@apollo/client';

import {
  MerchantApplicationFulfillmentQueryData,
  MerchantApplicationFulfillmentQueryVariables,
} from './types';

export const QUERY_MERCHANT_APPLICATION_FULFILLMENT = gql`
  query GetMerchantApplicationFulfillment($payload: GetMerchantApplicationFulfillmentInput) {
    merchantApplicationFulfillment(p: $payload) {
      edges {
        node {
          id
          warehouseCode
          productCategory
          averageOrderValue
          averageGoodsValue
          outboundOrdersMonthly
          numberOfItemsEachOutbound
          maxProductLength
          maxProductWidth
          maxProductHeight
          numbersOfSKU
          firstInboundValue
          firstInboundUOM
          cityID
          tierLevel
          productHasNationalStandard
          nearExpireDateInMonths
          mediaStorageType
          temperatureStorageType
          maxStack
          firstInboundDate
          inboundFrequencyPerMonth
          inboundSpecialRequest
          firstOutboundDate
          outboundPriority
          materialPackaging
          outboundSpecialRequest
          status
          dealID
        }
      }
    }
  }
`;

export default function useMerchantApplicationFulfillmentQuery(
  options?: LazyQueryHookOptions<
    MerchantApplicationFulfillmentQueryData,
    MerchantApplicationFulfillmentQueryVariables
  >,
) {
  return useQuery<
    MerchantApplicationFulfillmentQueryData,
    MerchantApplicationFulfillmentQueryVariables
  >(QUERY_MERCHANT_APPLICATION_FULFILLMENT, options);
}
