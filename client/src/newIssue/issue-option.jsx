import React from "react";
import styled from "styled-components";

import DetailOption from "./detail-option.jsx";

const StyleIssueOption = styled.div`
    position: absolute;
    right: 20%;
    width: 12%;
    height: 50%;
`

const IssueOption = (props) => {
    return (
        <StyleIssueOption>
            <DetailOption
                data={props.assignee}
                setData={props.setAssignee}
                name="Assignee"
                message="No one-assign yourself"/>
            <DetailOption
                data={props.label}
                setData={props.setLabel}
                name="Label"
                message="None yet" />
            <DetailOption
                data={props.milestone}
                setData={props.setMilestone}
                name="Milestone"
                message="No milestone"/>
        </StyleIssueOption>
    );
};

export default IssueOption;
