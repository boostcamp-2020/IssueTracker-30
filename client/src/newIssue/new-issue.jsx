import React from "react";

import NewIssueForm from "./new-issue-form.jsx";
import IssueOption from "./issue-option.jsx";


const newIssue = () => {
    return (
        <>
            <NewIssueForm />
            <IssueOption />
        </>
    );
};

export default newIssue;
