import React from "react";
import styled from "styled-components";
// import IssueOption from "../newIssue/issue-option.jsx";
import DetailIssueTitle from "./detail-issue-title.jsx";
import DetailIssueContent from "./detail-issue-center.jsx";

const StyledMainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    background-color: white;
`;

const detailIssue = ({ match }) => {
    const issueId = match.params.issueId;
    const issueData = JSON.parse(localStorage.getItem("issueData"));
    const issue = issueData.find(v => v.issueId === Number(issueId));
    console.log(issue);
    return (
        <>
            <StyledMainSection>
                <DetailIssueTitle 
                    title={issue.issueTitle} 
                    id={issue.issueId}
                    status={issue.status}
                    userId={issue.userId}
                    writingTime={issue.writingTime}
                />
                <DetailIssueContent
                    title={issue.issueTitle}
                    id={issue.issueId}
                    userId={issue.userId}
                    writingTime={issue.writingTime}
                    content={issue.content}
                 />
            </StyledMainSection>
        </>
    );
};

export default detailIssue;