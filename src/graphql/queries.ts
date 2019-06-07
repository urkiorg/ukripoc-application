// tslint:disable
// this is an auto generated file. This will be overwritten

export const getFundingApplication = `query GetFundingApplication($id: ID!) {
  getFundingApplication(id: $id) {
    id
    owner
    ownerName
    opportunityName
    opportunityDescription
    opportunityFunders
    openDate
    closeDate
    fundingApplicationQuestions {
      items {
        id
        owner
        heading
        title
        subtitle
        notes
        wordLimit
        answer
        complete
      }
      nextToken
    }
  }
}
`;
export const listFundingApplications = `query ListFundingApplications(
  $filter: ModelFundingApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listFundingApplications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      ownerName
      opportunityName
      opportunityDescription
      opportunityFunders
      openDate
      closeDate
      fundingApplicationQuestions {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getFundingApplicationQuestion = `query GetFundingApplicationQuestion($id: ID!) {
  getFundingApplicationQuestion(id: $id) {
    id
    owner
    heading
    title
    subtitle
    notes
    wordLimit
    fundingApplication {
      id
      owner
      ownerName
      opportunityName
      opportunityDescription
      opportunityFunders
      openDate
      closeDate
      fundingApplicationQuestions {
        nextToken
      }
    }
    answer
    complete
  }
}
`;
export const listFundingApplicationQuestions = `query ListFundingApplicationQuestions(
  $filter: ModelFundingApplicationQuestionFilterInput
  $limit: Int
  $nextToken: String
) {
  listFundingApplicationQuestions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      owner
      heading
      title
      subtitle
      notes
      wordLimit
      fundingApplication {
        id
        owner
        ownerName
        opportunityName
        opportunityDescription
        opportunityFunders
        openDate
        closeDate
      }
      answer
      complete
    }
    nextToken
  }
}
`;
