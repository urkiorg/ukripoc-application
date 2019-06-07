/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateFundingApplicationInput = {
  id?: string | null,
  owner?: string | null,
  ownerName?: string | null,
  opportunityName: string,
  opportunityDescription?: string | null,
  opportunityFunders?: Array< string | null > | null,
  openDate?: string | null,
  closeDate?: string | null,
};

export type UpdateFundingApplicationInput = {
  id: string,
  owner?: string | null,
  ownerName?: string | null,
  opportunityName?: string | null,
  opportunityDescription?: string | null,
  opportunityFunders?: Array< string | null > | null,
  openDate?: string | null,
  closeDate?: string | null,
};

export type DeleteFundingApplicationInput = {
  id?: string | null,
};

export type CreateFundingApplicationQuestionInput = {
  id?: string | null,
  owner?: string | null,
  heading?: string | null,
  title?: string | null,
  subtitle?: string | null,
  notes?: string | null,
  wordLimit?: number | null,
  answer?: string | null,
  complete?: boolean | null,
  fundingApplicationQuestionFundingApplicationId?: string | null,
};

export type UpdateFundingApplicationQuestionInput = {
  id: string,
  owner?: string | null,
  heading?: string | null,
  title?: string | null,
  subtitle?: string | null,
  notes?: string | null,
  wordLimit?: number | null,
  answer?: string | null,
  complete?: boolean | null,
  fundingApplicationQuestionFundingApplicationId?: string | null,
};

export type DeleteFundingApplicationQuestionInput = {
  id?: string | null,
};

export type ModelFundingApplicationFilterInput = {
  id?: ModelIDFilterInput | null,
  owner?: ModelStringFilterInput | null,
  ownerName?: ModelStringFilterInput | null,
  opportunityName?: ModelStringFilterInput | null,
  opportunityDescription?: ModelStringFilterInput | null,
  opportunityFunders?: ModelStringFilterInput | null,
  openDate?: ModelStringFilterInput | null,
  closeDate?: ModelStringFilterInput | null,
  and?: Array< ModelFundingApplicationFilterInput | null > | null,
  or?: Array< ModelFundingApplicationFilterInput | null > | null,
  not?: ModelFundingApplicationFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelFundingApplicationQuestionFilterInput = {
  id?: ModelIDFilterInput | null,
  owner?: ModelStringFilterInput | null,
  heading?: ModelStringFilterInput | null,
  title?: ModelStringFilterInput | null,
  subtitle?: ModelStringFilterInput | null,
  notes?: ModelStringFilterInput | null,
  wordLimit?: ModelIntFilterInput | null,
  answer?: ModelStringFilterInput | null,
  complete?: ModelBooleanFilterInput | null,
  and?: Array< ModelFundingApplicationQuestionFilterInput | null > | null,
  or?: Array< ModelFundingApplicationQuestionFilterInput | null > | null,
  not?: ModelFundingApplicationQuestionFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanFilterInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateFundingApplicationMutationVariables = {
  input: CreateFundingApplicationInput,
};

export type CreateFundingApplicationMutation = {
  createFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateFundingApplicationMutationVariables = {
  input: UpdateFundingApplicationInput,
};

export type UpdateFundingApplicationMutation = {
  updateFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteFundingApplicationMutationVariables = {
  input: DeleteFundingApplicationInput,
};

export type DeleteFundingApplicationMutation = {
  deleteFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateFundingApplicationQuestionMutationVariables = {
  input: CreateFundingApplicationQuestionInput,
};

export type CreateFundingApplicationQuestionMutation = {
  createFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type UpdateFundingApplicationQuestionMutationVariables = {
  input: UpdateFundingApplicationQuestionInput,
};

export type UpdateFundingApplicationQuestionMutation = {
  updateFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type DeleteFundingApplicationQuestionMutationVariables = {
  input: DeleteFundingApplicationQuestionInput,
};

export type DeleteFundingApplicationQuestionMutation = {
  deleteFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type GetFundingApplicationQueryVariables = {
  id: string,
};

export type GetFundingApplicationQuery = {
  getFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type ListFundingApplicationsQueryVariables = {
  filter?: ModelFundingApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFundingApplicationsQuery = {
  listFundingApplications:  {
    __typename: "ModelFundingApplicationConnection",
    items:  Array< {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFundingApplicationQuestionQueryVariables = {
  id: string,
};

export type GetFundingApplicationQuestionQuery = {
  getFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type ListFundingApplicationQuestionsQueryVariables = {
  filter?: ModelFundingApplicationQuestionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFundingApplicationQuestionsQuery = {
  listFundingApplicationQuestions:  {
    __typename: "ModelFundingApplicationQuestionConnection",
    items:  Array< {
      __typename: "FundingApplicationQuestion",
      id: string,
      owner: string | null,
      heading: string | null,
      title: string | null,
      subtitle: string | null,
      notes: string | null,
      wordLimit: number | null,
      fundingApplication:  {
        __typename: "FundingApplication",
        id: string,
        owner: string | null,
        ownerName: string | null,
        opportunityName: string,
        opportunityDescription: string | null,
        opportunityFunders: Array< string | null > | null,
        openDate: string | null,
        closeDate: string | null,
      } | null,
      answer: string | null,
      complete: boolean | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateFundingApplicationSubscription = {
  onCreateFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateFundingApplicationSubscription = {
  onUpdateFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteFundingApplicationSubscription = {
  onDeleteFundingApplication:  {
    __typename: "FundingApplication",
    id: string,
    owner: string | null,
    ownerName: string | null,
    opportunityName: string,
    opportunityDescription: string | null,
    opportunityFunders: Array< string | null > | null,
    openDate: string | null,
    closeDate: string | null,
    fundingApplicationQuestions:  {
      __typename: "ModelFundingApplicationQuestionConnection",
      items:  Array< {
        __typename: "FundingApplicationQuestion",
        id: string,
        owner: string | null,
        heading: string | null,
        title: string | null,
        subtitle: string | null,
        notes: string | null,
        wordLimit: number | null,
        answer: string | null,
        complete: boolean | null,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateFundingApplicationQuestionSubscription = {
  onCreateFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type OnUpdateFundingApplicationQuestionSubscription = {
  onUpdateFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};

export type OnDeleteFundingApplicationQuestionSubscription = {
  onDeleteFundingApplicationQuestion:  {
    __typename: "FundingApplicationQuestion",
    id: string,
    owner: string | null,
    heading: string | null,
    title: string | null,
    subtitle: string | null,
    notes: string | null,
    wordLimit: number | null,
    fundingApplication:  {
      __typename: "FundingApplication",
      id: string,
      owner: string | null,
      ownerName: string | null,
      opportunityName: string,
      opportunityDescription: string | null,
      opportunityFunders: Array< string | null > | null,
      openDate: string | null,
      closeDate: string | null,
      fundingApplicationQuestions:  {
        __typename: "ModelFundingApplicationQuestionConnection",
        nextToken: string | null,
      } | null,
    } | null,
    answer: string | null,
    complete: boolean | null,
  } | null,
};
