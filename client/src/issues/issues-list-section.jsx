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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
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
})``;

const StyledListSortOpenClosedCheckBoxLabel = styled.label`
    color: ${(props) => {
        let radioToString;
        if (props.openClosedRadio === 1) {
            radioToString = "closed";
        } else {
            radioToString = "open";
        }

        return props.htmlFor === radioToString ? "lightgray" : "black";
    }};
    margin-left: ${(props) => (props.htmlFor === "closed" ? "3%" : "0%")};
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

const StyledNoContent = styled.div`
    display: ${props => props.noContent ? 'none' : 'flex'};
    height: 27vh;
    justify-content: center;
    align-items: center;

    p {
        font-size: 28px;
        font-weight: bold;
    }
`;

const IssuesListSection = () => {
    const [openClosedRadio, setOpenClosedRadio] = useState(1);

    let noContent = true;

    const onOpenClosedRadioChange = (e) => {
        if (e.target.id === "open") {
            setOpenClosedRadio(1);
        } else {
            setOpenClosedRadio(0);
        }
    };

    const issueData = JSON.parse(localStorage.getItem("issueData"));

    const filteredIssueData = [];

    issueData.sort((a, b) => parseInt(b.issueId) - parseInt(a.issueId));

    issueData.forEach((element) => {
        if (element.status === openClosedRadio) {
            filteredIssueData.push(element);
        }
    });

    if (filteredIssueData.length === 0) {
        noContent = false;
    }

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const usersLiData = [];
    usersData.forEach((ele) => {
        usersLiData.push({ key: ele.userId, value: ele.userId, media: ele.userId});
    });

    const labelsData = JSON.parse(localStorage.getItem("labelsData"));
    const labelsLiData = [];
    labelsData.forEach((ele) => {
        labelsLiData.push({
            key: ele.ID,
            value: ele.content,
            media: ele.color,
        });
    });

    const milestonesData = JSON.parse(localStorage.getItem("milestonesData"));
    const milestonesLiData = [];
    milestonesData.forEach((ele) => {
        milestonesLiData.push({ key: ele.ID, value: ele.title });
    });

    return (
        <StyledListSection>
            <StyledListSortMenu>
                <StyledListSortCheckBoxDiv>
                    <StyledListSortCheckBoxInput />
                </StyledListSortCheckBoxDiv>
                <StyledListSortOpenClosedDiv>
                    <StyledListSortOpenClosedCheckBox
                        onChange={onOpenClosedRadioChange}
                        id="open"
                    />
                    <StyledListSortOpenClosedCheckBoxLabel
                        htmlFor="open"
                        openClosedRadio={openClosedRadio}
                    >
                        ⓘ Open
                    </StyledListSortOpenClosedCheckBoxLabel>
                    <StyledListSortOpenClosedCheckBox
                        onChange={onOpenClosedRadioChange}
                        id="closed"
                    />
                    <StyledListSortOpenClosedCheckBoxLabel
                        htmlFor="closed"
                        openClosedRadio={openClosedRadio}
                    >
                        ✔ Closed
                    </StyledListSortOpenClosedCheckBoxLabel>
                </StyledListSortOpenClosedDiv>
                <StyledListSortOptions>
                    <DropdownMenu name={"Author"} dataArray={usersLiData} />
                    <DropdownMenu
                        name={"Label"}
                        notUseTitle="Unlabeled"
                        dataArray={labelsLiData}
                    />
                    <DropdownMenu
                        name={"Milestones"}
                        notUseTitle="Issues with no milestones"
                        dataArray={milestonesLiData}
                    />
                    <DropdownMenu
                        name={"Assignee"}
                        notUseTitle="Assigned to nobody"
                        dataArray={usersLiData}
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
                <StyledNoContent noContent={noContent}><p>No result matched your search.</p></StyledNoContent>
            </StyledSortedList>
        </StyledListSection>
    );
};

export default IssuesListSection;
