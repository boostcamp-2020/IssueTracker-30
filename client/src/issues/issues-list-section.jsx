import React, { useState } from "react";
import styled from "styled-components";

import DropdownMenu from "./issue-sort-dropdown.jsx";
import ItemBanner from "./issue-item-banner.jsx";

const StyledListSection = styled.section`
    width: 1200px;
    ${"" /* height: 700px; */}
    min-height: 300px;
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
    display: flex;
    align-items: center;
    width: 500px;
    height: auto;
`;
const StyledListSortOpenClosedCheckBox = styled.input.attrs({
    type: "radio",
    name: "open-closed",
    hidden: true,
})`
`;

const StyledListSortOpenClosedCheckBoxLabel = styled.label`
    color: ${props => {
        let radioToString
        if (props.openClosedRadio === 1) {
            radioToString="closed";
        } else {
            radioToString="open";
        }

        return props.htmlFor === radioToString ? "lightgray" : "black"
    }};
    margin-left:${props => props.htmlFor === 'closed' ? "3%" : "0%"} ;
`;

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
    const [openClosedRadio, setOpenClosedRadio] = useState(1);

    const onOpenClosedRadioChange = (e) => {
        if (e.target.id === "open") {
            setOpenClosedRadio(1);
        } else {
            setOpenClosedRadio(0);
        }
    };

    const issueData = JSON.parse(localStorage.getItem("issueData"));

    const filteredIssueData = []

    issueData.sort((a, b) => parseInt(b.issueId) - parseInt(a.issueId));

    issueData.forEach((element) => {
        if (element.status === openClosedRadio) {
            filteredIssueData.push(element);
        }
    });

    return (
        <StyledListSection>
            <StyledListSortMenu>
                <StyledListSortCheckBoxDiv>
                    <StyledListSortCheckBoxInput />
                </StyledListSortCheckBoxDiv>
                <StyledListSortOpenClosedDiv>
                        <StyledListSortOpenClosedCheckBox onChange={onOpenClosedRadioChange} id="open"/>
                        <StyledListSortOpenClosedCheckBoxLabel htmlFor="open" openClosedRadio={openClosedRadio}>
                            ⓘ Open
                        </StyledListSortOpenClosedCheckBoxLabel>
                        <StyledListSortOpenClosedCheckBox onChange={onOpenClosedRadioChange}  id="closed" />
                        <StyledListSortOpenClosedCheckBoxLabel htmlFor="closed" openClosedRadio={openClosedRadio}>✔ Closed</StyledListSortOpenClosedCheckBoxLabel>
                </StyledListSortOpenClosedDiv>
                <StyledListSortOptions>
                    <DropdownMenu
                        name={"Author"}
                        options={[
                            [1, "author1"],
                            [2, "author2"],
                            [3, "author3"],
                            [4, "author4"],
                        ]}
                    />
                    <DropdownMenu
                        name={"Label"}
                        notUseTitle="Unlabeled"
                        options={[
                            [1, "labe1"],
                            [2, "labe2"],
                            [3, "labe3"],
                            [4, "labe4"],
                        ]}
                    />
                    <DropdownMenu
                        name={"Milestones"}
                        notUseTitle="Issues with no milestones"
                        options={[
                            [1, "Milestone1"],
                            [2, "Milestone2"],
                            [3, "Milestone3"],
                            [4, "Milestone4"],
                        ]}
                    />
                    <DropdownMenu
                        name={"Assignee"}
                        notUseTitle="Assigned to nobody"
                        options={[
                            [1, "Assignee1"],
                            [2, "Assignee2"],
                            [3, "Assignee3"],
                            [4, "Assignee4"],
                        ]}
                    />
                </StyledListSortOptions>
            </StyledListSortMenu>
            <StyledSortedList>
                {filteredIssueData.map(
                    ({ issueId, userId, issueTitle, status, writingTime }) => (
                        <ItemBanner
                            key={issueId}
                            issueTitle={issueTitle}
                            issueId={issueId}
                            userId={userId}
                            status={status}
                            writingTime={writingTime}
                        />
                    ),
                )}
            </StyledSortedList>
        </StyledListSection>
    );
};

export default IssuesListSection;
