import React from "react";
import styled from "styled-components";

import ListInfoBar from "./list-info-bar.jsx";
import ListSearchResult from "../labels/list-search-result.jsx";

const StyledList = styled.div`
    width: 900px;
    min-height: 300px;

    margin-top: 20px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);

    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 12px;
`;

const compareDataWithFilter = (dataText, filterTextLine) => {
    if (filterTextLine === "") return true;
    const splittedText = filterTextLine.split(" ");

    for (let t of splittedText) {
        if (t !== "" && dataText.includes(t)) return true;
    }
    return false;
};

const SearchList = ({ getRandomColor, filterText }) => {
    const labelsData = JSON.parse(localStorage.getItem("labelsData"));
    const filteredData = labelsData?.filter(
        (ele) =>
            compareDataWithFilter(ele.content, filterText) ||
            compareDataWithFilter(ele.description, filterText) ||
            compareDataWithFilter(ele.color, filterText)
    );
    const numOfLabel = filteredData?.length || 0;

    return (
        <StyledList>
            <ListInfoBar numOfLabel={numOfLabel} />
            <ListSearchResult
                labelsData={filteredData}
                numOfLabel={numOfLabel}
                getRandomColor={getRandomColor}
            />
        </StyledList>
    );
};

export default SearchList;
