import React, { useState } from "react";
import styled from "styled-components";

import Filter from "./filter.jsx";
import HeaderButtons from "./header-buttons.jsx";
import IssuesList from "./issues-list-section.jsx";

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
    const [isOpen, setIsOpen] = useState(true);

    const getTextInput = () => textInput;
    const addOptionToTextInput = (option) => {
        const authorRegex = /author:\w+/;
        const assigneeRegex = /assignee:\w+/;

        if (textInput.includes(option)) {
            setTextInput(textInput.replace(option, ""));
        } else if (authorRegex.test(option)) {
            setTextInput(
                `${textInput.replace(authorRegex, "").trim()} ${option}`
            );
        } else if (assigneeRegex.test(option)) {
            setTextInput(
                `${textInput.replace(assigneeRegex, "").trim()} ${option}`
            );
        } else {
            setTextInput(`${textInput.trim()} ${option}`);
        }
    };

    return (
        // TODO
        <StyledListDiv>
            <StyledListHeader>
                <Filter
                    setIsOpen={setIsOpen}
                    setTextInput={setTextInput}
                    getTextInput={getTextInput}
                />
                <HeaderButtons />
            </StyledListHeader>
            <IssuesList
                filterOptions={textInput}
                addOptionToTextInput={addOptionToTextInput}
            />
        </StyledListDiv>
    );
};

export default IssueList;
