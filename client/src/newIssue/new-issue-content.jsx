import React from "react";
import styled from "styled-components";

const StyledNewIssueContent = styled.textarea.attrs({
    placeholder: "Leave a comment",
})`
    width: 95.2%;
    height: 75%;
    background-color: #fafbfc;
    border: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    border-bottom-style: dashed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    margin: 1% 1% 0% 1%;
    resize: none;
    font-size: 14px;
    padding: 1%;
`;

const StyledNewIssueAttach = styled.input.attrs({
    type: "file",
})`
    display: none;
`

const StyledLabel = styled.label.attrs({
    htmlFor: "attachFile"
})`
    display: flex;
    align-items: center;
    width: 95.2%;
    height: 10%;
    background-color: #fafbfc;
    border: 1px solid #dbdde2;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top:1px solid red;
    margin: -1% 1% 1% 1%;
    font-size: 14px;
    padding: 1%;
`

const newIssueContent = (props) => {
    const handleChange = (e) => {
        props.setContent(e.target.value);
    }
    return (
        <>
            <StyledNewIssueContent value={props.content} onChange={handleChange}/>
            <StyledNewIssueAttach id="attachFile"/>
            <StyledLabel>Attach files by selecting here</StyledLabel>
        </>
    );
};

export default newIssueContent;
