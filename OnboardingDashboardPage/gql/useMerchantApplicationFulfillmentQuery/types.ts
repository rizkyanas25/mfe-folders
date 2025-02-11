export type MerchantApplicationFulfillmentNode = {
  node: {
    id: string;
    warehouseCode: string;
    productCategory: string;
    averageOrderValue: number;
    averageGoodsValue: number;
    outboundOrdersMonthly: number;
    outboundFrequencyPerMonth: number;
    numberOfItemsEachOutbound: number;
    maxProductLength: number;
    maxProductWidth: number;
    maxProductHeight: number;
    numbersOfSKU: number;
    firstInboundValue: number;
    firstInboundUOM: string;
    cityID: number;
    tierLevel: number;
    productHasNationalStandard: boolean;
    nearExpireDateInMonths: number;
    mediaStorageType: string;
    temperatureStorageType: string;
    maxStack: number;
    firstInboundDate: Date;
    inboundFrequencyPerMonth: number;
    inboundSpecialRequest: string;
    firstOutboundDate: Date;
    outboundPriority: string;
    materialPackaging: string;
    outboundSpecialRequest: string;
    outboundFrequencyPerDay: number;
    status: number;
    dealID: string;
    __typename?: string;
  };
};

export type MerchantApplicationFulfillmentQueryData = {
  merchantApplicationFulfillment: {
    totalCount: number;
    edges: Array<MerchantApplicationFulfillmentNode>;
  };
};

export type MerchantApplicationFulfillmentQueryVariables = {
  payload: {
    id?: number[];
    pagePagination?: {
      sortBy?: string[];
      limit?: number;
    };
  };
};
