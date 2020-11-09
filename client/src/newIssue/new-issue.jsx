import React, { useState } from "react";
import axios from "axios";

import NewIssueForm from "./new-issue-form.jsx";
import IssueOption from "./issue-option.jsx";


const newIssue = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [assignee, setAssignee] = useState(new Set());
    const [label, setLabel] = useState(new Set());
    const [milestone, setMilestone] = useState('');

    const submit = () => {
        const data = {
            title,
            writingTime: 0,
            status: 1,
            milestoneId: milestone.id,
            content,
            labelId: label,
            assignId: assignee
        };
        axios({
            method: "POST",
            url: "http://localhost:3000/issue",
            data,
            withCredentials: true,
        }).then((data) => {
            console.log(data)
        });
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
                milestone={milestone}
                setMilestone={setMilestone}
            />
        </>
    );
};

export default newIssue;
