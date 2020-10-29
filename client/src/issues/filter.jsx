import React, { useState } from "react";
import styled from "styled-components";

const StyledFilterDiv = styled.div`
    height: 30px;
    width: 600px;
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
})`
    height: 100%;
    width: 79%;

    color: rgba(97, 97, 97, 1);
`;

const Filter = () => {
    const [selected, setSelected] = useState("");
    const [textInput, setTextInput] = useState("");
    const [filterTypes, setFilterTypes] = useState([
        // TODO 타입별로 검색하는 방식??
        [0, "is:issue is:open sort:updated-desc", "Filter"],
        [1, "is:open sort:updated-desc", "Open issues and pull requests"],
        [2, "is:open is:issue author:@me sort:updated-desc", "Your issues"],
        [
            3,
            "is:open is:pr author:@me sort:updated-desc ",
            "Your pull requests",
        ],
        [
            4,
            "is:open assignee:@me sort:updated-desc ",
            "Everything assigned to you",
        ],
        [
            5,
            "is:open mentions:@me sort:updated-desc ",
            "Everything mentioning you",
        ],
        // TODO: commenter에 User GitHub ID 입력
        [
            6,
            "is:open commenter:gitgitWi sort:updated-desc ",
            "Everything commented by you",
        ],
        // TODO: 실제 GitHub Issue에서는 검색 아닌 redirect
        [7, "", "Everything you subscribed to"],
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
