import React, { useState, useEffect } from "react";
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
    font-size: 14px;
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
    cursor: pointer;
    margin-left: ${(props) => (props.htmlFor === "closed" ? "3%" : "0%")};
`;

const StyledListSortOptions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 700px;
    font-size: 14px;
`;

const StyledSortedList = styled.div`
    width: 100%;
    height: fit-content;
`;

const StyledNoContent = styled.div`
    display: ${(props) => (props.noContent ? "none" : "flex")};
    height: 27vh;
    justify-content: center;
    align-items: center;

    p {
        font-size: 28px;
        font-weight: bold;
    }
`;

const SelectedDiv = styled.div``;

const DefaultDiv = styled.div`
    width: 40%;
`;

const DropdownMenuDiv = styled.div`
    display: flex;
`;

const isOptionsInIssue = (optionsArr, issueAttrsArr) => {
    const copiedOptionsArr = optionsArr.slice();
    for (let ele of optionsArr) {
        if (issueAttrsArr.includes(ele)) {
            copiedOptionsArr.splice(copiedOptionsArr.indexOf(ele), 1);
        }
    }
    return copiedOptionsArr.length === 0 ? true : false;
};

const IssuesListSection = (props) => {
    const [openClosedRadio, setOpenClosedRadio] = useState(1);
    const [checked, setChecked] = useState(true);
    const [checkedFromChild, setCheckedFrom] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const issueData = JSON.parse(localStorage.getItem("issueData"));
    const usersData = JSON.parse(localStorage.getItem("usersData"));
    const usersLiData = [];
    const labelsData = JSON.parse(localStorage.getItem("labelsData"));
    const labelsLiData = [];
    const milestonesData = JSON.parse(localStorage.getItem("milestonesData"));
    const milestonesLiData = [];

    const [checkedIssue, setCheckedIssue] = useState([]);
    const [addIssue, setAddIssue] = useState(0);
    const [excludeIssue, setExcludeIssue] = useState(0);

    const numOfOpenIssue = issueData.filter(v => v.status).length;
    const numOfClosedIssue = issueData.length - numOfOpenIssue;

    let noContent = true;

    useEffect(() => {
        setChecked(checkedFromChild);
    }, [checkedFromChild, selectedCount]);


    useEffect(() => {
        setCheckedIssue([...checkedIssue, addIssue]);
    }, [addIssue]);

    useEffect(() => {
        const tempCheckedIssue = [...checkedIssue];
        const idx = tempCheckedIssue.indexOf(excludeIssue);
        if (idx > -1) tempCheckedIssue.splice(idx, 1);
        setCheckedIssue(tempCheckedIssue);
    }, [excludeIssue]);

    const onOpenClosedRadioChange = (e) => {
        if (e.target.id === "open") {
            setOpenClosedRadio(1);
        } else {
            setOpenClosedRadio(0);
        }
    };

    useEffect(() => {
        if (checked) {
            const allIssue = issueData.map(v => v.issueId);
            setCheckedIssue(allIssue);
        } else {
            setCheckedIssue([]);
        }
    }, [checked]);

    const checkClick = () => {
        checked
            ? setSelectedCount(0)
            : setSelectedCount(filteredIssueData.length);
        setChecked(!checked);
        setCheckedFrom(!checked);
    };

    const checkedFunc = () => {
        return checked;
    };

    const markAsData = [{ key: 1, value: "Open" }, { key: 0, value: "Closed" }];

    const filterOptions = {};
    const filterOptionsModifier = props.filterOptions.split(" ").map((ele) => {
        let [key, value] = ele.split(":");
        if (!value) [key, value] = ["title", key];
        if (Object.keys(filterOptions).includes(key)) {
            filterOptions[key].push(value);
        } else {
            filterOptions[key] = [value];
        }
    });

    const filteredIssueData = issueData
        .filter((ele) => ele.status === openClosedRadio)
        .filter((ele) =>
            filterOptions.author
                ? filterOptions.author.includes(ele.userId)
                : ele
        )
        .filter((ele) => {
            return filterOptions.assignee
                ? filterOptions.assignee[0] === "notUse"
                    ? ele.assignId.length === 0
                    : ele.assignId.includes(filterOptions.assignee[0])
                : ele;
        })
        .filter((ele) =>
            filterOptions.label
                ? filterOptions.label[0] === "notUse"
                    ? ele.labelId.length === 0
                    : isOptionsInIssue(filterOptions.label, ele.labelContent)
                : ele
        )
        .filter((ele) =>
            filterOptions.milestones
                ? filterOptions.milestones[0] === "notUse"
                    ? !ele.milestoneId
                    : filterOptions.milestones.includes(ele.milestoneTitle)
                : ele
        )
        .filter((ele) =>
            filterOptions.title
                ? isOptionsInIssue(filterOptions.title, ele.issueTitle)
                : ele
        )
        .sort((a, b) => parseInt(b.issueId) - parseInt(a.issueId));

    if (filteredIssueData.length === 0) {
        noContent = false;
    }

    usersData.forEach((ele) => {
        usersLiData.push({
            key: ele.userId,
            value: ele.userId,
            media: ele.userId,
        });
    });

    labelsData.forEach((ele) => {
        labelsLiData.push({
            key: ele.ID,
            value: ele.content,
            media: ele.color,
        });
    });

    milestonesData.forEach((ele) => {
        milestonesLiData.push({ key: ele.ID, value: ele.title });
    });

    return (
        <StyledListSection>
            <StyledListSortMenu>
                <StyledListSortCheckBoxDiv>
                    <StyledListSortCheckBoxInput
                        checked={checkedFunc()}
                        onChange={checkClick}
                    />
                </StyledListSortCheckBoxDiv>
                <StyledListSortOpenClosedDiv>
                    {selectedCount == 0 &&
                        <DefaultDiv>
                            <StyledListSortOpenClosedCheckBox
                                onChange={onOpenClosedRadioChange}
                                id="open"
                            />
                            <StyledListSortOpenClosedCheckBoxLabel
                                htmlFor="open"
                                openClosedRadio={openClosedRadio}
                            >
                                ⓘ {numOfOpenIssue} Open
                    </StyledListSortOpenClosedCheckBoxLabel>
                            <StyledListSortOpenClosedCheckBox
                                onChange={onOpenClosedRadioChange}
                                id="closed"
                            />
                            <StyledListSortOpenClosedCheckBoxLabel
                                htmlFor="closed"
                                openClosedRadio={openClosedRadio}
                            >
                                ✔ {numOfClosedIssue} Closed
                    </StyledListSortOpenClosedCheckBoxLabel></DefaultDiv>}
                    {(selectedCount > 0)
                        && <SelectedDiv>{selectedCount} selected</SelectedDiv>}
                </StyledListSortOpenClosedDiv>
                <StyledListSortOptions>
                    {selectedCount > 0
                        && <DropdownMenu
                            name={"MarkAs"}
                            dataArray={markAsData}
                            addOptionToTextInput={props.addOptionToTextInput}
                            checkedIssue={checkedIssue}
                        />
                    }
                    {selectedCount === 0 && <DropdownMenuDiv><DropdownMenu
                        name={"Author"}
                        dataArray={usersLiData}
                        addOptionToTextInput={props.addOptionToTextInput}
                    />
                        <DropdownMenu
                            name={"Label"}
                            notUseTitle="Unlabeled"
                            dataArray={labelsLiData}
                            addOptionToTextInput={props.addOptionToTextInput}
                        />
                        <DropdownMenu
                            name={"Milestones"}
                            notUseTitle="Issues with no milestones"
                            dataArray={milestonesLiData}
                            addOptionToTextInput={props.addOptionToTextInput}
                        />
                        <DropdownMenu
                            name={"Assignee"}
                            notUseTitle="Assigned to nobody"
                            dataArray={usersLiData}
                            addOptionToTextInput={props.addOptionToTextInput}
                        /></DropdownMenuDiv>}
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
                            checked={checked}
                            func={setChecked}
                            func2={setCheckedFrom}
                            count={filteredIssueData.length}
                            selectedFunc={setSelectedCount}
                            excludeIssueFunc={setExcludeIssue}
                            addIssueFunc={setAddIssue}
                        />
                    )
                )}
                <StyledNoContent noContent={noContent}>
                    <p>No result matched your search.</p>
                </StyledNoContent>
            </StyledSortedList>
        </StyledListSection>
    );
};

export default IssuesListSection;
