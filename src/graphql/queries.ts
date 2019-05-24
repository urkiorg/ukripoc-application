// tslint:disable
// this is an auto generated file. This will be overwritten

export const getApplication = `query GetApplication($id: ID!) {
  getApplication(id: $id) {
    id
    name
  }
}
`;
export const listApplications = `query ListApplications(
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
    }
    nextToken
  }
}
`;
