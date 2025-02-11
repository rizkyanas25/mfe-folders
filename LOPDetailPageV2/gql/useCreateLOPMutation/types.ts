export type CreateLOPMutationVariables = {
  input: {
    applicationID: number;
    companyName: string;
    picName: string;
    picPosition: string;
    picEmail: string;
    picPhone: string;
    financeEmail: string;
    businessEntity: string;
    nib: string;
    companyAddress: string;
  };
};

export type CreateLOPMutationData = {
  picName: string;
};
