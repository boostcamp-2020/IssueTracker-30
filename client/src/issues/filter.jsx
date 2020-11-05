import React, { useState } from "react";
import styled from "styled-components";

const StyledFilterDiv = styled.div`
    height: 100%;
    width: 70%;
    z-index: 1;
    display: flex;
`;

const StyledFilterTextInput = styled.input.attrs({
    type: "text",
    placeholder: "Search All Issues",
})`
    height: 100%;
    width: 79%;
    color: rgba(97, 97, 97, 1);
    box-shadow: 0 0 2px 0 grey;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #fafbfc;
`;

const StyledFilterButton = styled.button.attrs({})`
    height: 32px;
    width: 10%;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 0 2px 0 grey;
    background-color: #fafbfc;
`;

const StyledFilterModal = styled.div`
    position: absolute;
    top: 60px;
    display: block;
    width: 21%;
    background-color: white;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 3px;
    display: ${(props) => (props.visible ? "block" : "none")};
`;

const StyledFilterModalOverlay = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: -1;
`;

const StyledFilterList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 2% 0% 0% 0%;
    font-size: 14px;
`;
const StyledFilterTitle = styled.li`
    border-bottom: 1px solid lightgray;
    padding: 0 0 2% 3%;
    font-weight: bold;
`;

const StyledFilterContent = styled.li`
    border-bottom: 1px solid lightgray;
    padding: 2% 3%;

    &:hover {
        background-color: #f6f8fa;
    }
`;

const StyledFilterFooter = styled.li`
    padding: 2% 3%;
    font-weight: bold;

    &:hover {
        background-color: #f6f8fa;
    }
`;

const Filter = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const setTextInput = props.setTextInput;
    const getTextInput = props.getTextInput;
    const setFilterTextRemoverVisibility = props.setFilterTextRemoverVisibility;

    const onFilterSelectedChange = (e) => {
        if (e.target) {
            //TODO
        }
        setTextInput(e.target.getAttribute("value"));
        setModalVisible(!modalVisible);
    };

    const onFilterTextChange = (e) => {
        const {
            target: { value },
        } = e;

        setTextInput(value);
        setFilterTextRemoverVisibility(true);
    };

    const onFilterKeyPress = (e) => {
        const {
            target: { value },
            key,
        } = e;

        if (key === "Enter") {
            // TODO fetching for search
            alert(`입력값: ${value}`);
        }
    };

    const onFilterClick = () => {
        setModalVisible(!modalVisible);
    };

    const onFilterFooterClick = () => {
        window.open(
            "https://docs.github.com/en/free-pro-team@latest/github/searching-for-information-on-github/searching-issues-and-pull-requests"
        );
        setModalVisible(!modalVisible);
    };

    const [filter, setFilter] = useState([
        {
            id: 1,
            value: "is:open",
            text: "Open issues",
            data: "",
        },
        {
            id: 2,
            value: "is:open author:@me",
            text: "Your issues",
        },
        {
            id: 3,
            value: "is:open assignee:@me",
            text: "Everything assigned to you",
        },
        {
            id: 4,
            value: "is:open mentions:@me",
            text: "Everything mentioning you",
        },
        { id: 5, value: "is:closed", text: "Closed issues" },
    ]);

    return (
        <StyledFilterDiv>
            <StyledFilterButton onClick={onFilterClick}>
                Filter ▼
            </StyledFilterButton>
            <StyledFilterModal visible={modalVisible}>
                <StyledFilterModalOverlay
                    onClick={onFilterClick}
                ></StyledFilterModalOverlay>
                <StyledFilterList>
                    <StyledFilterTitle>Filter Issues</StyledFilterTitle>
                    {filter.map((filterOption) => (
                        <StyledFilterContent
                            onClick={onFilterSelectedChange}
                            key={filterOption.id}
                            value={filterOption.value}
                        >
                            {filterOption.text}
                        </StyledFilterContent>
                    ))}
                    <StyledFilterFooter onClick={onFilterFooterClick}>
                        <svg
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="16"
                            height="16"
                            aria-hidden="true"
                        >
                            <path d="M10.604 1h4.146a.25.25 0 01.25.25v4.146a.25.25 0 01-.427.177L13.03 4.03 9.28 7.78a.75.75 0 01-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0110.604 1zM3.75 2A1.75 1.75 0 002 3.75v8.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 12.25v-3.5a.75.75 0 00-1.5 0v3.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-8.5a.25.25 0 01.25-.25h3.5a.75.75 0 000-1.5h-3.5z"></path>
                        </svg>{" "}
                        View advanced search syntax
                    </StyledFilterFooter>
                </StyledFilterList>
            </StyledFilterModal>

            <StyledFilterTextInput
                value={getTextInput()}
                onChange={onFilterTextChange}
                onKeyPress={onFilterKeyPress}
            />
        </StyledFilterDiv>
    );
};

export default Filter;
