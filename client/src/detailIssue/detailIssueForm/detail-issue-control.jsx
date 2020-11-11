import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
    background: linear-gradient(rgba(51,205,86,1) 0%, rgba(41,171,71,1) 100%);
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
            <Link to="/signup">
                <StyledSubmitButton onClick={props.clickComment}>Update Comment</StyledSubmitButton>
            </Link>
        </>
    );
};

export default detailIssueControl;
