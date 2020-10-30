import React, { useState } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    width: 30%;
    height: 32px;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
    background-color: rgba(76,175,80,1);
    color: white;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        background: rgba(56, 142, 60, 1);
    }

    &:focus {
        outline: none;
    }
`;

const NewIssueButton = () => {
    const onNewIssueButtonClick = (e) => {
        // TODO issue create 페이지로 이동
        alert("New Issue 페이지로 이동");
    };

    return (
        <StyledButton onClick={onNewIssueButtonClick}>New Issue</StyledButton>
    );
};

export default NewIssueButton;
