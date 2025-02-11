export type MerchantApplicationFulfillmentNode = {
  node: {
    id: number;
    companyName: string;
    picName: string;
    picPhone: string;
    picEmail: string;
    picPosition: string;
    financeEmail: string;
    businessEntity: string;
    nib: string;
    companyAddress: string;
    status: number;
    __typename?: string;
  };
};

export type FulfillmentApplicationQueryData = {
  merchantApplicationFulfillment: {
    totalCount: number;
    edges: Array<MerchantApplicationFulfillmentNode>;
  };
};

export type FulfillmentApplicationQueryVariables = {
  payload: {
    id?: number[];
    pagePagination?: {
      sortBy?: string[];
      limit?: number;
    };
  };
};
