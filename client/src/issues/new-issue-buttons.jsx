import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
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
    return (
        <Link to="/new">
            <StyledButton>New Issue</StyledButton>
        </Link>
    );
};

export default NewIssueButton;
