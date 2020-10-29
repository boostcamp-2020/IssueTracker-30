import React, { useState } from "react";
import styled from "styled-components";

const StyledFilterDiv = styled.div`
    height: 100%;
    width: 70%;
`;

const StyledFilterSelect = styled.select.attrs({
    id: "issue-list-filter",
})`
    height: 100%;
    width: 19%;
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

    color: rgba(97, 97, 97, 1);
`;

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

    return (
        <StyledFilterDiv>
            <StyledFilterSelect onChange={onFilterSelectedChange}>
                {filterTypes.map(([typeId, typeValue, typeLabel]) => (
                    <StyledFilterOption key={typeId} value={typeValue}>
                        {typeLabel}
                    </StyledFilterOption>
                ))}
            </StyledFilterSelect>

            <StyledFilterTextInput
                value={textInput}
                onChange={onFilterTextChange}
                onKeyPress={onFilterKeyPress}
            />
        </StyledFilterDiv>
    );
};

export default Filter;
