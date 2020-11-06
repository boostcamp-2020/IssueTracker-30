import React from "react";
import styled from "styled-components";

import IssueTitle from "./new-issue-title.jsx";
import IssueContent from "./new-issue-content.jsx"
import IssueControl from "./new-issue-control.jsx"

const StyledNewIssueForm = styled.div.attrs({
    action: "/user/test",
    method: "POST"
})`
    position: absolute;
    left: 20%;
    display: flex;
    background-color: white;
    width: 47%;
    height: 50%;
`

const StyledImg = styled.img`
    width: 50px;
    height: 50px;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 3px;
`

const StyledTriangleDiv = styled.div`
    position: absolute;
    left: 9%;
    top: 3%;
    background-color: white;
    width: 13px;
    height: 13px;
    border-left: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    transform: rotateZ(45deg);
`

const StyledNewIssueSection = styled.div`
    background-color: white;
    position: absolute;
    right: 0%;
    width: 90%;
    height: 90%;
    border: 1px solid #dbdde2;
    border-radius: 3px;
`

const StyledTitleDiv = styled.div`
    height: 25%;
    border-bottom: 1px solid #dbdde2;
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
    height: 15%;
    padding: 0% 1%;
    display: flex;
    align-items: flex-end;
`

const newIssueForm = (props) => {
    const userId = localStorage.getItem('userId');
    const usersData = JSON.parse(localStorage.getItem("usersData"));

    const userData = usersData.filter((data) => data.userId === userId);

    return (
        <StyledNewIssueForm>
            <StyledImg src={userData[0].imageURL}/>
            <StyledNewIssueSection >
                <StyledTitleDiv>
                    <IssueTitle title={props.title} setTitle={props.setTitle} />
                </StyledTitleDiv>
                <StyledWriteTag>Write</StyledWriteTag>
                <StyledContentDiv>
                    <IssueContent content={props.content} setContent={props.setContent} />
                </StyledContentDiv>
                <StyledControlDiv>
                    <IssueControl submit={props.submit} />
                </StyledControlDiv>
            </StyledNewIssueSection>
            <StyledTriangleDiv />
        </StyledNewIssueForm>
    );
};

export default newIssueForm;
