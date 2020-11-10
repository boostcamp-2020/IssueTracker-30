import React from "react";
import styled from "styled-components";

import SearchHeader from "./labels-search-header.jsx";
import SearchResults from "../components/search-list.jsx";

const StyledLabelList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const LabelsList = () => {
    const getRandomColor = () =>
        `#${[...Array(6).keys()]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")
            .toUpperCase()}`;

    return (
        <StyledLabelList>
            <SearchHeader getRandomColor={getRandomColor} />
            <SearchResults getRandomColor={getRandomColor} />
        </StyledLabelList>
    );
};

export default LabelsList;
