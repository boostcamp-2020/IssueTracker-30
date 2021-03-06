import React from "react";
import styled from "styled-components";

import DetailOption from "./detail-option.jsx";

const StyleIssueOption = styled.div`
    position: absolute;
    right: 20%;
    width: 12%;
    height: 50%;
    margin-top: ${(props) => (props.mode === "detail" ? "3%" : "0%")};
`;

const IssueOption = (props) => {
    return (
        <StyleIssueOption mode={props.mode}>
            <DetailOption
                data={props.assignee}
                setData={props.setAssignee}
                name="Assignee"
                issueId={props.issueId}
                message="No one-assign yourself"
            />
            <DetailOption
                issueId={props.issueId}
                data={props.label}
                setData={props.setLabel}
                labelId={props.labelId}
                setLabelId={props.setLabelId}
                name="Label"
                message="None yet"
            />
            <DetailOption
                issueId={props.issueId}
                data={props.milestone}
                setData={props.setMilestone}
                name="Milestone"
                message="No milestone"
            />
        </StyleIssueOption>
    );
};

export default IssueOption;
