import React from "react";
import styled from "styled-components";

const StyledNewIssueTitle = styled.input.attrs({
    type: "text",
    placeholder: "Title",
})`
    width: 96%;
    height: 30%;
    background-color: #fafbfc;
    border: 1px solid #dbdde2;
    border-radius: 3px;
    margin: 1%;
    padding-left: 1%;
`;

const newIssueTitle = () => {
    return (
        <StyledNewIssueTitle />
    );
};

export default newIssueTitle;
