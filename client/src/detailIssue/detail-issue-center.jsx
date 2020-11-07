import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IssueOption from "../newIssue/issue-option.jsx";
import DetailIssueForm from "./detailIssueForm/detail-issue-form.jsx";
import DetailIssueComment from "./detail-issue-comment.jsx";
import axios from "axios";

const DetailIssueContentDiv = styled.div`
    position: absolute;
    top: 25%;
    left: 20%;
    width: 60%;
    height: 80%;
`;

const HrLine = styled.hr`
    margin-bottom: 2%;
`;

const DetailIssueCenter =  (issue) => {
    const [comment, setComment] = useState([]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [assignee, setAssignee] = useState(new Set());
    const [label, setLabel] = useState(new Set());
    const [milestone, setMilestone] = useState('');

    useEffect( () => {
        axios({
            method: "POST",
            url: "/comment/getComment",
            data: {
                issueId: issue.id
            },
            withCredentials: true,
        }).then(res => {
            setComment(res.data);
        });
    }, []);

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
            </DetailIssueContentDiv>
            <IssueOption
                mode="detail"
                assignee={assignee}
                setAssignee={setAssignee}
                label={label}
                setLabel={setLabel}
                milestone={milestone}
                setMilestone={setMilestone}
            />
        </>
    );
};

export default DetailIssueCenter;