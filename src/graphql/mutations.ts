// tslint:disable
// this is an auto generated file. This will be overwritten

export const createFundingApplication = `mutation CreateFundingApplication($input: CreateFundingApplicationInput!) {
  createFundingApplication(input: $input) {
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
export const updateFundingApplication = `mutation UpdateFundingApplication($input: UpdateFundingApplicationInput!) {
  updateFundingApplication(input: $input) {
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
export const deleteFundingApplication = `mutation DeleteFundingApplication($input: DeleteFundingApplicationInput!) {
  deleteFundingApplication(input: $input) {
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
export const createFundingApplicationQuestion = `mutation CreateFundingApplicationQuestion(
  $input: CreateFundingApplicationQuestionInput!
) {
  createFundingApplicationQuestion(input: $input) {
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
export const updateFundingApplicationQuestion = `mutation UpdateFundingApplicationQuestion(
  $input: UpdateFundingApplicationQuestionInput!
) {
  updateFundingApplicationQuestion(input: $input) {
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
export const deleteFundingApplicationQuestion = `mutation DeleteFundingApplicationQuestion(
  $input: DeleteFundingApplicationQuestionInput!
) {
  deleteFundingApplicationQuestion(input: $input) {
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
