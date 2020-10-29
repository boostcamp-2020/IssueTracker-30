import React, { useState } from "react";
import styled from "styled-components";

const StyledButtons = styled.div`
    height: 100%;
    width: 66%;
`;
const StyledLabelButton = styled.button`
    height: 100%;
    width: 50%;
    background-color: white;
    color: rgba(38, 50, 56, 1);
    border-radius: 5px 0 0 5px;

    &:hover {
        cursor: pointer;
        background-color: rgba(207, 216, 220, 1);
    }
`;

const StyledLabelIcon = styled.i.attrs({
    className: "fas fa-tag",
})`
    margin: 0 5px;
`;

const StyledMilestoneButton = styled.button`
    height: 100%;
    width: 50%;
    background-color: white;
    border-radius: 0 5px 5px 0;
    color: rgba(38, 50, 56, 1);

    &:hover {
        cursor: pointer;
        background-color: rgba(207, 216, 220, 1);
    }
`;

const StyledMilestoneIcon = styled.i.attrs({
    className: "fas fa-map-signs",
})`
    margin: 0 5px;
`;

const LabelMilestoneButtons = () => {
    return (
        <StyledButtons>
            <StyledLabelButton>
                <StyledLabelIcon />
                Label
            </StyledLabelButton>
            <StyledMilestoneButton>
                <StyledMilestoneIcon />
                MileStone
            </StyledMilestoneButton>
        </StyledButtons>
    );
};

export default LabelMilestoneButtons;
