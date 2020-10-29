import React, { useState } from "react";
import styled from "styled-components";

import LabelMilestone from "./label-milestone-buttons.jsx";
import NewIssue from "./new-issue-buttons.jsx";

const StyledHeaderButtons = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 30%;
`;

const HeaderButtons = () => {
    return (
        <StyledHeaderButtons>
            <LabelMilestone />
            <NewIssue />
        </StyledHeaderButtons>
    );
};

export default HeaderButtons;
