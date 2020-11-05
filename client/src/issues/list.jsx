import React, { useState } from "react";
import styled from "styled-components";

import Filter from "./filter.jsx";
import HeaderButtons from "./header-buttons.jsx";
import IssuesList from "./issues-list-section.jsx";
import FilterTextRemover from "./filter-text-remover.jsx";

const StyledListDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 180px;
`;

const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    width: 1200px;
    margin-top: 20px;
`;

const IssueList = () => {
    const [textInput, setTextInput] = useState("is:open");
    const [isOpen, setIsOpen] = useState(false);
    const [
        isFilterTextRemoverVisible,
        setIsFilterTextRemoverVisible,
    ] = useState(false);

    const getTextInput = () => textInput;
    const addOptionToTextInput = (option) => {
        const isRegex = /is:\w+/g;
        const authorRegex = /author:[\w@]+/g;
        const assigneeRegex = /assignee:[\w@]+/g;

        setIsFilterTextRemoverVisible(true);

        let theText = "";
        if (isRegex.test(option)) {
            theText = `${textInput.replace(isRegex, "").trim()} ${option}`;
        } else if (textInput.includes(option)) {
            theText = textInput.replace(option, "");
        } else if (authorRegex.test(option)) {
            theText = `${textInput.replace(authorRegex, "").trim()} ${option}`;
        } else if (assigneeRegex.test(option)) {
            theText = `${textInput
                .replace(assigneeRegex, "")
                .trim()} ${option}`;
        } else {
            theText = `${textInput.trim()} ${option}`;
        }

        setTextInput(theText.trim());
    };

    return (
        <StyledListDiv>
            <StyledListHeader>
                <Filter
                    setIsOpen={setIsOpen}
                    setTextInput={setTextInput}
                    getTextInput={getTextInput}
                    setFilterTextRemoverVisibility={
                        setIsFilterTextRemoverVisible
                    }
                />
                <HeaderButtons />
            </StyledListHeader>
            <FilterTextRemover
                isVisible={isFilterTextRemoverVisible}
                setVisible={setIsFilterTextRemoverVisible}
                setTextInput={setTextInput}
            />
            <IssuesList
                filterOptions={textInput}
                addOptionToTextInput={addOptionToTextInput}
            />
        </StyledListDiv>
    );
};

export default IssueList;
