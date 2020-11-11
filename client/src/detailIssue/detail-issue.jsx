import React, { useState } from "react";
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
    const [status, setStatus] = useState(issue.status);
    const [commentNum, setCommentNum] = useState(0);
    issue.label = issue.labelId.map((id, ind) => {
        return { id: id, content: issue.labelContent[ind] };
    });
    const milestone = {id: issue.milestoneId, value: issue.milestoneTitle};
    
    return (
        <>
            <StyledMainSection>
                <DetailIssueTitle
                    title={issue.issueTitle}
                    id={issue.issueId}
                    status={status}
                    userId={issue.userId}
                    writingTime={issue.writingTime}
                    commentNum={commentNum}
                />
                <DetailIssueContent
                    title={issue.issueTitle}
                    id={issue.issueId}
                    status={status}
                    setStatus={setStatus}
                    userId={issue.userId}
                    writingTime={issue.writingTime}
                    content={issue.content}
                    label={issue.label}
                    assign={issue.assignId}
                    milestone={milestone}
                    setCommentNum={setCommentNum}
                />
            </StyledMainSection>
        </>
    );
};

export default detailIssue;