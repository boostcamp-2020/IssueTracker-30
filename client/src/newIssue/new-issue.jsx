import React, { useState } from "react";

import NewIssueForm from "./new-issue-form.jsx";
import IssueOption from "./issue-option.jsx";


const newIssue = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [assignee, setAssignee] = useState(new Set());
    const [label, setLabel] = useState(new Set());
    const [milestone, setMilestone] = useState('');

    const submit = () => {
        console.log(title, content)
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
