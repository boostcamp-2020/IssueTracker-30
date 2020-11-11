import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledCancelButton = styled.button`
    background: white;
    border: none;
    margin-top: 2%;
    margin-left: -5%;
    font-size: 15px;
`

const StyledSubmitButton = styled.button`
    right: 2%;
    font-size: 15px;
    height: 8%;
    color: white;
    border: 1px solid #33b04f;
    border-radius: 6px;
    background-color: #33b04f;

    :disabled {
        border: 1px solid gray;
        background-color: gray;
    }
`

const detailIssueControl = props => {
    const openCloseClickHandler = () => {
        axios({
            method: "PUT",
            url: "http://localhost:3000/issue",
            data: {
                mode: 4,
                issueId: props.issueId,
                status: props.status ? 0 : 1
            },
            withCredentials: true,
        }).then(res => {
            const tempLocalStorage = JSON.parse(localStorage.getItem('issueData'));
            const changedIssue = tempLocalStorage.map(issue => {
                if (issue.issueId === props.issueId) {
                    return { ...issue, status: props.status ? 0 : 1 }
                } else return issue;
            })
            localStorage.setItem('issueData', JSON.stringify(changedIssue));
            props.setStatus(props.status ? 0 : 1);
        });
    }

    return (
        <>
            <StyledCancelButton onClick={openCloseClickHandler}>{props.status ? 'ⓘ Close issue' : 'ⓘ Reopen issue'}</StyledCancelButton>
            <StyledSubmitButton onClick={props.clickComment} disabled={props.comment.length === 0? true : false}>Update Comment</StyledSubmitButton>
        </>
    );
};

export default detailIssueControl;
