import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width: 30%;
    border-color: rgba(56, 142, 60, 1);
    border-radius: 5px;
    background-color: rgba(76, 175, 80, 1);
    color: rgba(255, 255, 255, 0.8);

    &:hover {
        cursor: pointer;
        background: rgba(56, 142, 60, 1);
    }
`;

const NewIssueButton = () => {
    return <StyledButton>New Issue</StyledButton>;
};

export default NewIssueButton;
