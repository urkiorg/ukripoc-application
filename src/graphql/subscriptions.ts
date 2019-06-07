// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateFundingApplication = `subscription OnCreateFundingApplication {
  onCreateFundingApplication {
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
export const onUpdateFundingApplication = `subscription OnUpdateFundingApplication {
  onUpdateFundingApplication {
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
export const onDeleteFundingApplication = `subscription OnDeleteFundingApplication {
  onDeleteFundingApplication {
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
export const onCreateFundingApplicationQuestion = `subscription OnCreateFundingApplicationQuestion {
  onCreateFundingApplicationQuestion {
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
export const onUpdateFundingApplicationQuestion = `subscription OnUpdateFundingApplicationQuestion {
  onUpdateFundingApplicationQuestion {
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
export const onDeleteFundingApplicationQuestion = `subscription OnDeleteFundingApplicationQuestion {
  onDeleteFundingApplicationQuestion {
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
