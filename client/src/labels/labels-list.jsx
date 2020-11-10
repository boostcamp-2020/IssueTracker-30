import React, { useState } from "react";
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
    const [filterText, setFilterText] = useState("");

    const getRandomColor = () =>
        `#${[...Array(6).keys()]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join("")
            .toUpperCase()}`;

    return (
        <StyledLabelList>
            <SearchHeader
                getRandomColor={getRandomColor}
                filterText={filterText}
                setFilterText={setFilterText}
            />
            <SearchResults
                getRandomColor={getRandomColor}
                filterText={filterText}
            />
        </StyledLabelList>
    );
};

export default LabelsList;
