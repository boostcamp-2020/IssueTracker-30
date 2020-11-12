import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import host from "../../../config.js"
import IssueContent from "./detail-issue-content.jsx"
import IssueControl from "./detail-issue-control.jsx"

const StyledNewIssueForm = styled.div`
    position: absolute;
    left: 20%;
    top: 70%;
    display: flex;
    width: 46%;
    height: 20%;
`

const StyledImgDiv = styled.img`
    width:50px;
    height:50px;
    border: 1px solid lightgray;
    border-radius: 3px;
`

const StyledTriangleDiv = styled.div`
    position: absolute;
    left: 8%;
    top: 6%;
    background-color: #f7f8fa;
    width: 13px;
    height: 13px;
    border-left: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    transform: rotateZ(45deg);
`

const StyledNewIssueSection = styled.div`
    background-color: white;
    right: 0%;
    width: 90%;
    height: 90%;
    border: 1px solid #dbdde2;
    border-radius: 6px;
    margin-left: 3.2%;
`

const StyledTitleDiv = styled.div`
    height: 20%;
    border-bottom: 1px solid #dbdde2;
    background-color: #f7f8fa;
`

const StyledWriteTag = styled.button`
    position: absolute;
    top: 15.3%;
    left: 1%;
    border: 1px solid lightgray;
    border-bottom: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: white;
    width: 10%;
    height: 10%;
    font-size: 14px;
`

const StyledContentDiv = styled.div`
    height: 60%;
`

const StyledControlDiv = styled.div`
    float:right
`
const getDatetime = date => {
    const pad = n => { return n < 10 ? '0' + n : n }
    return date.getUTCFullYear() + '-'
        + pad(date.getUTCMonth() + 1) + '-'
        + pad(date.getUTCDate()) + ' '
        + pad(date.getUTCHours()) + ':'
        + pad(date.getUTCMinutes()) + ':'
        + pad(date.getUTCSeconds())
}

const detailIssueForm = props => {
    const [comment, setComment] = useState('');
    const clickCommentHandler = () => {
        axios({
            method: "POST",
            url: `http://${host}:3000/comment/insertComment`,
            data: {
                issueId: props.issueId,
                writingTime: getDatetime(new Date()),
                comment: comment
            },
            withCredentials: true,
        }).then(res => {
            const newComment = {
                ID: res.data.insertId,
                commentUserId: localStorage.getItem("userId"),
                commentWritingTime: getDatetime(new Date()),
                comment: comment
            }
            setComment('');
            props.setAllComment([...props.allComment, newComment]);
        });
    }

    const userData = JSON.parse(localStorage.getItem("usersData"));

    let imageURL;
    userData.forEach(element => {
        if(element.userId === localStorage.getItem("userId")){
            imageURL = element.imageURL;
        }
    });

    return (
        <StyledNewIssueForm>
            <StyledImgDiv src={imageURL} />
            <StyledNewIssueSection >
                <StyledTitleDiv>
                </StyledTitleDiv>
                <StyledContentDiv>
                    <IssueContent setComment={setComment} comment={comment} />
                </StyledContentDiv>
                <StyledControlDiv>
                    <IssueControl comment={comment} clickComment={clickCommentHandler} issueId={props.issueId} status={props.status} setStatus={props.setStatus}/>
                </StyledControlDiv>
            </StyledNewIssueSection>
            <StyledTriangleDiv />
        </StyledNewIssueForm>
    );
};

export default detailIssueForm;
