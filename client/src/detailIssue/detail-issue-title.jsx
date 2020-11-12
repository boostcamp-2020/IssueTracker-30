import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import host from "../../config.js";

const StyledDetailIssueTitle = styled.div`
    position: absolute;
    top: 10%;
    left: 20%;
    width: 60%;
    height: 15%;
`;

const StyledTitle = styled.h1`
`;

const TempDiv = styled.div`
    display: flex;
    line-height: 2;
`;

const StyledTitleDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledTitleInput = styled.input.attrs({
    type: "text",
})`
    width: 1000px;
    font-size: 2em;
`;

const StyledButton = styled.button`
    height: 32px;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
    background-color: rgba(76,175,80,1);
    color: white;
    font-weight: bold;
    outline:none;
`;

const StyledEditButton = styled.button`
    height: 32px;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
    background-color: grey;
    color: white;
    font-weight: bold;
    outline:none;
    &:hover {
        cursor: pointer;
    }
`;

const StyledSubTitle = styled.div`
    margin-left: 10px;
`;

const StyledSaveButton = styled.button`
    height: 32px;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
    background-color: grey;
    color: white;
    font-weight: bold;
`;

const StyledCancelButton = styled.button`
    height: 32px;
    border: none;
    outline: none;
    background: none;
    color: blue;
    font-weight: bold;
    &:hover {
        cursor: pointer;
    }
`;

const DetailIssueTitle = (issue) => {
    const [editableMode, setEditableMode] = useState(false);
    const [title, setTitle] = useState(issue.title);
    const editCancelBtnClickHandler = () => {
        setEditableMode(!editableMode);
    }
    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(issue.writingTime),
    ).getDate();

    const inputChangeHandler = (evt) => {
        setTitle(evt.target.value);
    }

    const changeTitle = async (evt) => {
        await axios({
            method: 'put',
            url: `http://${host}:3000/issue`,
            data: {
                mode: 1,
                issueId: issue.id,
                title: title
            },
            withCredentials: true
        }).then(result => {
            const tempLocalStorage = JSON.parse(localStorage.issueData);
            tempLocalStorage[tempLocalStorage.findIndex(v => v.issueId === issue.id)].issueTitle = title;
            localStorage.setItem(
                "issueData",
                JSON.stringify(tempLocalStorage),
            );
            setEditableMode(false);
        });
    }

    return (
        <StyledDetailIssueTitle>
            {!editableMode &&
                <StyledTitleDiv>
                    <StyledTitle>{title === undefined ? issue.title : title} #{issue.id}</StyledTitle>
                    <StyledEditButton onClick={editCancelBtnClickHandler}>Edit</StyledEditButton>
                </StyledTitleDiv>
            }
            {editableMode &&
                <StyledTitleDiv>
                    <StyledTitleInput value={title} onChange={inputChangeHandler} />
                    <StyledSaveButton onClick={changeTitle}>Save</StyledSaveButton>
                    <StyledCancelButton onClick={editCancelBtnClickHandler}>Cancel</StyledCancelButton>
                </StyledTitleDiv>
            }
            <TempDiv>
                <StyledButton>{issue.status ? 'ⓘ Open' : 'ⓘ Closed'}</StyledButton>
                <StyledSubTitle>
                    {issue.userId}
                    {issue.status ? ' opened' : ' closed'} this issue {updatedTimeBefore} days ago, {issue.commentNum} comments
                </StyledSubTitle>
            </TempDiv>
        </StyledDetailIssueTitle>
    );
};

export default DetailIssueTitle;