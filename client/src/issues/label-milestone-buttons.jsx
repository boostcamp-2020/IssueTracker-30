import React, { useState } from "react";
import styled from "styled-components";

const StyledButtons = styled.div`
    display: flex;
    height: 100%;
    width: 66%;
`;
const StyledLabelButton = styled.button`
    display: flex;
    flex-direction: rows;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 45%;
    background-color: white;
    color: rgba(38,50,56,1);
    font-weight: bold;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px 0 0 5px;

    &:hover {
        cursor: pointer;
        background-color: #fafbfc;
    }

    &:focus {
        outline: none;
    }
`;

const StyledMilestoneButton = styled.button`
    display: flex;
    flex-direction: rows;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 55%;
    background-color: white;
    color: rgba(38,50,56,1);
    font-weight: bold;
    border: none;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 0 5px 5px 0;

    &:hover {
        cursor: pointer;
        background-color: #fafbfc;
    }

    &:focus {
        outline: none;
    }
`;

const StyledLabelMilestoneText = styled.div`
    border: 0;
    margin: 0 5px;
`;

const StyledLabelMilestoneNumber = styled.div`
    display: flex;
    background-color: rgba(209,213,218,0.5);
    font-size: 9pt;
    padding: 3px 8px 1px 8px;
    border: none;
    border-radius: 9px
    
`;

const LabelMilestoneButtons = () => {
    const labelData = JSON.parse(localStorage.getItem("labelsData"));
    const milestoneData = JSON.parse(localStorage.getItem("milestonesData"));
    let labelCount = 0;
    let milestoneCount = 0;
    if (labelData) {
        labelCount = labelData.length;
    }
    if (milestoneData) {
        milestoneCount = milestoneData.length;
    }
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
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true" margin-right="5px">
                    <path fillRule="evenodd" d="M2.5 7.775V2.75a.25.25 0 01.25-.25h5.025a.25.25 0 01.177.073l6.25 6.25a.25.25 0 010 .354l-5.025 5.025a.25.25 0 01-.354 0l-6.25-6.25a.25.25 0 01-.073-.177zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 010 2.474l-5.026 5.026a1.75 1.75 0 01-2.474 0l-6.25-6.25A1.75 1.75 0 011 7.775zM6 5a1 1 0 100 2 1 1 0 000-2z">
                    </path>
                </svg>
                <StyledLabelMilestoneText>
                    Labels
                </StyledLabelMilestoneText>
                <StyledLabelMilestoneNumber>
                    {labelCount}
                </StyledLabelMilestoneNumber>
            </StyledLabelButton>
            <StyledMilestoneButton onClick={onMilestoneButtonClick}>
                <svg viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z">
                    </path>
                </svg>
                <StyledLabelMilestoneText>
                    Milestones
                </StyledLabelMilestoneText>
                <StyledLabelMilestoneNumber>
                    {milestoneCount}
                </StyledLabelMilestoneNumber>
            </StyledMilestoneButton>
        </StyledButtons>
    );
};

export default LabelMilestoneButtons;
