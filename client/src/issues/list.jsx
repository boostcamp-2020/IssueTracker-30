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
        const authorRegex = /author:[\S@]+($|\s*)/g;
        const assigneeRegex = /assignee:[\S@]+($|\s*)/g;
        const type = option.split(":")[0];
        const typeRegex = new RegExp(`\\s{0,1}${type}:\\S+`, "g");
        const typeNotUseRegex = new RegExp(`\\s{0,1}${type}:notUse`);
        const optionTrimRegex = new RegExp(`\\s{0,1}${option}($|\\s)`, "g");

        setIsFilterTextRemoverVisible(true);

        let theText = "";

        if (isRegex.test(option)) {
            theText = `${textInput.replace(isRegex, "").trim()} ${option}`;
        } else if (authorRegex.test(option)) {
            theText = `${textInput.replace(authorRegex, "").trim()} ${option}`;
        } else if (assigneeRegex.test(option)) {
            theText = `${textInput
                .replace(assigneeRegex, "")
                .trim()} ${option}`;
        } else if (textInput.includes(option)) {
            theText = textInput.replace(optionTrimRegex, " ").trim();
        } else if (typeNotUseRegex.test(option)) {
            theText = `${textInput.replace(typeRegex, "").trim()} ${option}`;
        } else {
            theText = `${textInput
                .replace(typeNotUseRegex, "")
                .trim()} ${option}`;
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
