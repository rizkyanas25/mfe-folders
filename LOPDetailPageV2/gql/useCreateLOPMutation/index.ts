import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { CreateLOPMutationData, CreateLOPMutationVariables } from './types';

export const MUTATION_CREATE_LOP = gql`
  mutation LOPDetailPage($input: CreateMerchantApplicationFulfillmentLOPInput!) {
    createMerchantApplicationFulfillmentLOP(input: $input) {
      picName
    }
  }
`;

export default function useCreateLOPMutation(
  options?: MutationHookOptions<CreateLOPMutationData, CreateLOPMutationVariables>,
) {
  return useMutation<CreateLOPMutationData, CreateLOPMutationVariables>(
    MUTATION_CREATE_LOP,
    options,
  );
}
