import React from "react";
import styled from "styled-components";

import DetailOption from "./detail-option.jsx";

const StyleIssueOption = styled.div`
    position: absolute;
    right: 20%;
    width: 12%;
    height: 50%;
`

const IssueOption = () => {
    return (
        <StyleIssueOption>
            <DetailOption name="Assignee" message="No one-assign yourself"/>
            <DetailOption name="Label" message="None yet" />
            <DetailOption name="Milestone" message="No milestone"/>
        </StyleIssueOption>
    );
};

export default IssueOption;
