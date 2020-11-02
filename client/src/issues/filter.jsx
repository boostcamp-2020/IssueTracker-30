import React, { useState } from "react";
import styled from "styled-components";

const StyledFilterDiv = styled.div`
    height: 100%;
    width: 70%;
    z-index: 1;
    display: flex;
`;

const StyledFilterSelect = styled.select.attrs({
    id: "issue-list-filter",
})`
    height: 32px;
    width: 19%;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 0 2px 0 grey;
    background-color: #fafbfc;
`;

// TODO: Option은 CSS 적용 불가
// Select-Option 모두 별도 div로 변경해야 함
const StyledFilterOption = styled.option``;

const StyledFilterTextInput = styled.input.attrs({
    type: "text",
    placeholder: "Search All Issues",
})`
    height: 100%;
    width: 79%;
    color: rgba(97,97,97,1);
    box-shadow: 0 0 2px 0 grey;
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #fafbfc;
`;

const StyledFilterButton = styled.button.attrs({
    
})`
    height: 32px;
    width: 19%;
    border: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 0 2px 0 grey;
    background-color: #fafbfc;
`;

const StyledFilterModal = styled.div`
    position: absolute;
    top: 34%;
    display: block;
    width: 15%;
    background-color: white;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 3px;
    display: ${props => (props.visible? 'block' : 'none')};
`

const StyledFilterModalOverlay = styled.div`
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: -1;
`

const StyledFilterList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 4% 0%;
`
const StyledFilterTitle = styled.li`
    border-bottom: 1px solid lightgray;
    padding-bottom: 2%;
`

const StyledFilterContent = styled.li`
    border-bottom: 1px solid lightgray;
    padding: 2% 0%;

    &:hover {
        background-color: #fafbfc;
    }
`

const StyledFilterFooter = styled.li`
    padding-top: 2%;

    &:hover {
        background-color: #fafbfc;
    }
`


const Filter = () => {
    const [selected, setSelected] = useState("");
    const [textInput, setTextInput] = useState("is:issue is:open");
    const [filterTypes, setFilterTypes] = useState([
        // TODO 타입별로 검색하는 방식??
        /**
         * 검색 type
         * is:issue
         * is:open / closed
         * sort:updated-desc / updated-asc / created-desc / created-asc / comments-desc / comments-asc
         * author:@me
         * assignee:@me
         * mentions:@me
         */

        [0, "is:issue is:open sort:updated-desc", "Filter Issues"],
        [1, "is:issue is:open sort:updated-desc", "Open issues"],
        [2, "is:issue is:open author:@me sort:updated-desc", "Your issues"],
        [
            3,
            "is:issue is:open assignee:@me sort:updated-desc",
            "Everything assigned to you",
        ],
        [
            4,
            "is:issue is:open mentions:@me sort:updated-desc",
            "Everything mentioning you",
        ],
        [5, "is:issue is:closed", "Closed issues"],
    ]);

    const onFilterSelectedChange = (e) => {
        setTextInput(e.target.value);
    };

    const onFilterTextChange = (e) => {
        const {
            target: { value },
        } = e;

        setTextInput(value);
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

    const [modalVisble, setModalVisible] = useState(false);

    const onFilterClick = () => {
        setModalVisible(!modalVisble);
    }

    const [filter, setFilter] = useState([
        { id: 1, text: 1},
        { id: 2, text: 2},
        { id: 3, text: 3},
        { id: 4, text: 4},
        { id: 5, text: 5}
    ]);

    return (
        <StyledFilterDiv>
            <StyledFilterButton onClick={onFilterClick}>Filter</StyledFilterButton>
            <StyledFilterModal visible={modalVisble}>
                <StyledFilterModalOverlay onClick={onFilterClick}></StyledFilterModalOverlay>
                <StyledFilterList>
                    <StyledFilterTitle>title</StyledFilterTitle>
                    {filter.map(fil => <StyledFilterContent key={fil.id}>{fil.text}</StyledFilterContent>)}
                    <StyledFilterFooter>title</StyledFilterFooter>
                </StyledFilterList>
            </StyledFilterModal>
            {/* <StyledFilterSelect onChange={onFilterSelectedChange}>
                {filterTypes.map(([typeId, typeValue, typeLabel]) => (
                    <StyledFilterOption key={typeId} value={typeValue}>
                        {typeLabel}
                    </StyledFilterOption>
                ))}
            </StyledFilterSelect> */}

            <StyledFilterTextInput
                value={textInput}
                onChange={onFilterTextChange}
                onKeyPress={onFilterKeyPress}
            />
        </StyledFilterDiv>
    );
};

export default Filter;
