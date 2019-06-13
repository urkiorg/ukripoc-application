export interface Organisation {
    ID: string;
    Name: string;
}

// Applications
export type Applications = Array<Application>;
type ApplicationType = "Application";

export interface Application {
    __typename: Application,
    closeApplication: string,
    openApplication: string,
    updatedAt: string,
    applicationOpportunityId: string,
    createdAt: string,
    id:string,
    rank: number,
};

// OpportunityTypes
type OpportunityType = "Opportunity";

export interface Opportunity {
    __typename: OpportunityType,
    createdAt: string,
    description: string,
    name: string,
    lowestRankedApplication: Application
};

// FundingApplications
export type FundingApplications = Array<FundingApplication>;

export interface FundingApplication {
    id: string
    owner: string
    ownerName: string
    opportunityName: string!
    opportunityDescription: string
    opportunityFunders: [string]
    openDate: string
    closeDate: string
    fundingApplicationQuestions: [FundingApplicationQuestion],
    number: integer,
}

export interface FundingApplicationQuestion {
    id: string
    owner: string
    heading: string
    title: string
    subtitle: string
    notes: string
    wordLimit: integer
    fundingApplication: FundingApplication
    answer: string
    complete: boolean
}