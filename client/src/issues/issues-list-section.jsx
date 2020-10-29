import React from "react";
import styled from "styled-components";

import DropdownMenu from "./issue-sort-dropdown.jsx";

const StyledListSection = styled.section`
    width: 1200px;
    ${"" /* height: 700px; */}
    min-height: 300px;
    background-color: rgba(249, 249, 249, 1);
    margin-top: 20px;
    border: 1px solid rgba(207, 216, 220, 1);
    border-radius: 7px;
`;

const StyledListSortMenu = styled.div`
    display: flex;
    flex-direction: row;
    height: 50px;
    border-bottom: 1px solid rgba(207, 216, 220, 1);
    border-radius: 7px 7px 0 0;
    background-color: rgba(236, 239, 241, 1);
`;

const StyledListSortCheckBoxDiv = styled.div`
    width: 50px;
    height: 100%;
    text-align: center;
`;
const StyledListSortCheckBoxInput = styled.input.attrs({
    type: "checkbox",
})`
    height: 15px;
    width: 15px;
`;

const StyledListSortOpenClosedDiv = styled.div`
    width: 500px;
    height: auto;
`;
const StyledListSortOpenClosedCheckBox = styled.input.attrs({
    type: "radio",
    name: "open-closed",
    hidden: true,
})`
    &:checked + label {
        font-weight: bold;
    }

    &:hover + label:hover {
        background-color: rgba(207, 216, 220, 1);
    }
`;

const StyledListSortOpenClosedCheckBoxLabel = styled.label.attrs({
    name: "open-closed",
})``;

const StyledListSortOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 700px;
`;

const StyledSortedList = styled.div`
    width: 100%;
    height: fit-content;
`;

const IssuesListSection = () => {
    return (
        <StyledListSection>
            <StyledListSortMenu>
                <StyledListSortCheckBoxDiv>
                    <StyledListSortCheckBoxInput />
                </StyledListSortCheckBoxDiv>
                <StyledListSortOpenClosedDiv>
                    <StyledListSortOpenClosedCheckBoxLabel>
                        Open
                        <StyledListSortOpenClosedCheckBox
                            checked="checked"
                            id="open"
                        />
                    </StyledListSortOpenClosedCheckBoxLabel>
                    <StyledListSortOpenClosedCheckBoxLabel>
                        Closed
                        <StyledListSortOpenClosedCheckBox id="closed" />
                    </StyledListSortOpenClosedCheckBoxLabel>
                </StyledListSortOpenClosedDiv>
                <StyledListSortOptions>
                    <DropdownMenu name={"Author"} />
                    <DropdownMenu name={"Label"} />
                    <DropdownMenu name={"Milestones"} />
                    <DropdownMenu name={"Assignee"} />
                </StyledListSortOptions>
            </StyledListSortMenu>
            <StyledSortedList></StyledSortedList>
        </StyledListSection>
    );
};

export default IssuesListSection;
