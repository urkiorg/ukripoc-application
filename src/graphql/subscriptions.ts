// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateFundingApplication = `subscription OnCreateFundingApplication {
  onCreateFundingApplication {
    id
    opportunityName
    opportunityDescription
    opportunityFunders
    openDate
    closeDate
    fundingApplicationQuestions {
      items {
        id
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
    opportunityName
    opportunityDescription
    opportunityFunders
    openDate
    closeDate
    fundingApplicationQuestions {
      items {
        id
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
    opportunityName
    opportunityDescription
    opportunityFunders
    openDate
    closeDate
    fundingApplicationQuestions {
      items {
        id
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
    heading
    title
    subtitle
    notes
    wordLimit
    fundingApplication {
      id
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
    heading
    title
    subtitle
    notes
    wordLimit
    fundingApplication {
      id
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
    heading
    title
    subtitle
    notes
    wordLimit
    fundingApplication {
      id
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
