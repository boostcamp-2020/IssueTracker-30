import React, { useState } from "react";
import styled from "styled-components";

const StyledFilterDiv = styled.div`
    height: 30px;
    width: 60vw;
`;

const StyledFilterSelect = styled.select.attrs({
    id: "issue-list-filter",
})`
    height: 100%;
    width: 29%;
`;

const StyledFilterOption = styled.option``;

const StyledFilterTextInput = styled.input.attrs({
    type: "text",
})`
    height: 100%;
    width: 69%;
`;

const Filter = () => {
    const [selected, setSelected] = useState("");
    const [textInput, setTextInput] = useState("");
    const [filterTypes, setFilterTypes] = useState([
        [0, "Filter"],
        [1, "Open issues and pull requests"],
        [2, "Your issues"],
        [3, "Your pull requests"],
        [4, "Everything assigned to you"],
    ]);

    const onFilterSelectedChange = (e) => {
        // TODO: selecte key 값 가져오는 방법?
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
                {filterTypes.map(([typeId, typeLabel]) => (
                    <StyledFilterOption key={typeId}>
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
