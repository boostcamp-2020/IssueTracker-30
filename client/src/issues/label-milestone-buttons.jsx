import React, { useState } from "react";
import styled from "styled-components";

const StyledButtons = styled.div`
    height: 100%;
    width: 66%;
`;
const StyledLabelButton = styled.button`
    height: 100%;
    width: 45%;
    background-color: white;
    color: rgba(38, 50, 56, 1);
    border-right: 0;
    border-radius: 5px 0 0 5px;

    &:hover {
        cursor: pointer;
        background-color: rgba(207, 216, 220, 1);
    }

    &:focus {
        outline: none;
    }
`;

const StyledLabelIcon = styled.i.attrs({
    className: "fas fa-tag",
})`
    margin: 0 5px;
`;

const StyledMilestoneButton = styled.button`
    height: 100%;
    width: 55%;
    background-color: white;
    border-radius: 0 5px 5px 0;
    color: rgba(38, 50, 56, 1);

    &:hover {
        cursor: pointer;
        background-color: rgba(207, 216, 220, 1);
    }

    &:focus {
        outline: none;
    }
`;

const StyledMilestoneIcon = styled.i.attrs({
    className: "fas fa-map-signs",
})`
    margin: 0 5px;
`;

const LabelMilestoneButtons = () => {
    const onLabelButtonClick = (e) => {
        // TODO 클릭 이벤트 -> label 만 나오는 페이지
        alert("Label 만 보여주는 페이지로 이동");
    };

    const onMilestoneButtonClick = (e) => {
        // TODO 클릭 이벤트 -> label 만 나오는 페이지
        alert("Milestone 만 보여주는 페이지로 이동");
    };

    return (
        <StyledButtons>
            <StyledLabelButton onClick={onLabelButtonClick}>
                <StyledLabelIcon />
                Label
            </StyledLabelButton>
            <StyledMilestoneButton onClick={onMilestoneButtonClick}>
                <StyledMilestoneIcon />
                MileStone
            </StyledMilestoneButton>
        </StyledButtons>
    );
};

export default LabelMilestoneButtons;
