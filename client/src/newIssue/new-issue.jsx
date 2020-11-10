import React, { useState } from "react";
import axios from "axios";

import NewIssueForm from "./new-issue-form.jsx";
import IssueOption from "./issue-option.jsx";


const getDateTime = () => {
    const year = (new Date().getFullYear()).toString().padStart(2, 0)
    const month = (new Date().getMonth() + 1).toString().padStart(2, 0)
    const date = (new Date().getDate()).toString().padStart(2, 0)
    const hours = (new Date().getHours()).toString().padStart(2, 0)
    const minutes = (new Date().getMinutes()).toString().padStart(2, 0)
    const seconds = (new Date().getSeconds()).toString().padStart(2, 0)

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

const newIssue = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [assignee, setAssignee] = useState(new Set());
    const [label, setLabel] = useState(new Set());
    const [labelId, setLabelId] = useState(new Set());
    const [milestone, setMilestone] = useState('');

    const submit = () => {
        if (title.length < 1) return;
        if (confirm("이슈를 등록하시겠습니까?")) {
            const filteredLabelId = [];

            labelId.forEach(element => {
                filteredLabelId.push(Number(element.split('_')[1]))
            });

            const data = {
                title,
                writingTime: getDateTime(),
                status: 1,
                milestoneId: Number(milestone.id),
                content,
                labelId: filteredLabelId,
                assignId: assignee
            };
            axios({
                method: "POST",
                url: "http://localhost:3000/issue",
                data,
                withCredentials: true,
            }).then((res) => {
                if (res.data.message === "success") {
                    alert("이슈를 등록하였습니다!");
                    location.href = "/"
                }
            });
        }
    }
    return (
        <>
            <NewIssueForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                submit={submit}
            />
            <IssueOption
                assignee={assignee}
                setAssignee={setAssignee}
                label={label}
                setLabel={setLabel}
                labelId={labelId}
                setLabelId={setLabelId}
                milestone={milestone}
                setMilestone={setMilestone}
            />
        </>
    );
};

export default newIssue;
