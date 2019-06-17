import React, { FC, useCallback } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import { Application } from "../Application";
import {
    GetFundingApplicationQuery,
    UpdateFundingApplicationMutation
} from "../../API";

import { getFundingApplication } from "../../graphql/queries";
import { useQuery, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import { updateFundingApplication } from "../../graphql/mutations";

interface Props extends RouteComponentProps {
    id?: string;
}

const GET_APPLICATION = gql(getFundingApplication);

const UPDATE_APPLICATION = gql(updateFundingApplication);

export const ApplicationPage: FC<Props> = ({ id }) => {
    const { data } = useQuery<GetFundingApplicationQuery>(GET_APPLICATION, {
        variables: { id }
    });

    const updateFundingApplicationMutation = useMutation<
        UpdateFundingApplicationMutation
    >(UPDATE_APPLICATION);

    const updateFundingApplication = useCallback(async () => {
        const result = await updateFundingApplicationMutation({
            variables: {
                input: {
                    id: id,
                    complete: true
                }
            }
        });

        const { data } = result;

        console.log(data);

        if (data) {
            navigate(
                `/application/${data.updateFundingApplication.fundingApplication.id}`
            );
        }
    }, [updateFundingApplicationMutation, id]);

    return (
        <Application
            application={data}
            updateFundingApplication={updateFundingApplication}
        />
    );
};

export default ApplicationPage;
