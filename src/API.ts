/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateApplicationInput = {
  id?: string | null,
  name: string,
};

export type UpdateApplicationInput = {
  id: string,
  name?: string | null,
};

export type DeleteApplicationInput = {
  id?: string | null,
};

export type ModelApplicationFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  and?: Array< ModelApplicationFilterInput | null > | null,
  or?: Array< ModelApplicationFilterInput | null > | null,
  not?: ModelApplicationFilterInput | null,
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

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput,
};

export type CreateApplicationMutation = {
  createApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput,
};

export type UpdateApplicationMutation = {
  updateApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput,
};

export type DeleteApplicationMutation = {
  deleteApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type GetApplicationQueryVariables = {
  id: string,
};

export type GetApplicationQuery = {
  getApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type ListApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApplicationsQuery = {
  listApplications:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      name: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateApplicationSubscription = {
  onCreateApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type OnUpdateApplicationSubscription = {
  onUpdateApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};

export type OnDeleteApplicationSubscription = {
  onDeleteApplication:  {
    __typename: "Application",
    id: string,
    name: string,
  } | null,
};
