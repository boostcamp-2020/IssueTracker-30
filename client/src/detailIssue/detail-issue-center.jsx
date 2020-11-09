import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IssueOption from "../newIssue/issue-option.jsx";
import DetailIssueForm from "./detailIssueForm/detail-issue-form.jsx";
import DetailIssueComment from "./detail-issue-comment.jsx";
import axios from "axios";

const DetailIssueContentDiv = styled.div`
    /* position: absolute; */
    top: 25%;
    left: 20%;
    width: 60%;
    height: 80%;
`;

const HrLine = styled.hr`
    margin-bottom: 2%;
    margin-top: 3%;
`;

const DetailIssueCenter = (issue) => {
    const [comment, setComment] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const assigneeSet = new Set();
    issue.assign.forEach((id) => assigneeSet.add(id));
    const [assignee, setAssignee] = useState(assigneeSet);
    const labelSet = new Set();
    console.log(issue.label);
    issue.label.forEach((issue) => labelSet.add(issue));
    const [label, setLabel] = useState(labelSet);
    const [milestone, setMilestone] = useState("");

    useEffect(() => {
        axios({
            method: "POST",
            url: "http://localhost:3000/comment/getComment",
            data: {
                issueId: issue.id,
            },
            withCredentials: true,
        }).then((res) => {
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
                {comment.map(
                    ({ commentUserId, comment, ID, commentWritingTime }) => (
                        <DetailIssueComment
                            mode={"comment"}
                            id={ID}
                            userId={commentUserId}
                            comment={comment}
                            commentWritingTime={commentWritingTime}
                        />
                    )
                )}
            </DetailIssueContentDiv>
            <DetailIssueForm
                userId={issue.userId}
                issueId={issue.id}
                status={issue.status}
                setStatus={issue.setStatus}
                allComment={comment}
                setAllComment={setComment}
            ></DetailIssueForm>

            <IssueOption
                mode="detail"
                issueId={issue.id}
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
