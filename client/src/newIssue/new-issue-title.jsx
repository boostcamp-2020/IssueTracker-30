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

const newIssueTitle = (props) => {
    const handleChange = (e) => {
        props.setTitle(e.target.value);
    }
    return (
        <StyledNewIssueTitle value={props.title} onChange={handleChange}/>
    );
};

export default newIssueTitle;
