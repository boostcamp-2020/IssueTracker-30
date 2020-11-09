import React, {useState} from "react";
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

const detailIssueContent = props => {
    const commentChangeHandler = event => {
        props.setComment(event.target.value);
    }
    return (
        <>
            <StyledNewIssueContent onChange={commentChangeHandler} value={props.comment}>{props.comment}</StyledNewIssueContent>
        </>
    );
};

export default detailIssueContent;
