import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IssueOption from "../newIssue/issue-option.jsx";
import DetailIssueForm from "./detailIssueForm/detail-issue-form.jsx";
import DetailIssueComment from "./detail-issue-comment.jsx";
import axios from "axios";

const DetailIssueContentDiv = styled.div`
    width: 95%;
    height: 80%;
    margin-top: 10%;
`;

const HrLine = styled.hr`
    margin-bottom: 2%;
`;

const DetailIssueCenter =  (issue) => {
    const [comment, setComment] = useState([]);
    useEffect( () => {
        axios({
            method: "POST",
            url: "http://localhost:3000/comment/getComment",
            data: {
                issueId: issue.id
            },
            withCredentials: true,
        }).then(res => {
            setComment(res.data);
        });
    }, []);
    console.log(comment);

    return (
        <>
            <DetailIssueContentDiv>
                <HrLine></HrLine>
                <DetailIssueComment
                    title={issue.title}
                    id={issue.id}
                    userId={issue.userId}
                    writingTime={issue.writingTime}
                    content={issue.content}
                />
                { comment.map(({commentUserId, comment, ID, commentWritingTime }) => (
                    <DetailIssueComment
                        mode={"comment"}
                        id={ID}
                        userId={commentUserId}
                        comment={comment}
                        commentWritingTime={commentWritingTime}
                    />
                )) }
                <IssueOption />
            </DetailIssueContentDiv>
        </>
    );
};

export default DetailIssueCenter;