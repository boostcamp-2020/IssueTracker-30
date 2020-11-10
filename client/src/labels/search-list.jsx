import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

import ListInfoBar from "./list-info-bar.jsx";
import ListSearchResult from "./list-search-result.jsx";

const StyledList = styled.div`
  width: 900px;
  min-height: 300px;

  margin-top: 20px;

  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgb(36, 41, 46);

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-weight: 400;
  font-size: 12px;
`;

const labelsData = JSON.parse(localStorage.getItem("labelsData"));
const numOfLabel = labelsData?.length || 0;

const SearchList = () => {
  return (
    <StyledList>
      <ListInfoBar numOfLabel={numOfLabel} />
      <ListSearchResult labelsData={labelsData} numOfLabel={numOfLabel} />
    </StyledList>
  );
};

export default SearchList;
