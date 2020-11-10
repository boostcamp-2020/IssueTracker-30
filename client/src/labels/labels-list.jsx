import React from "react";
import styled from "styled-components";

import SearchHeader from "./labels-search-header.jsx";
import SearchResults from "./search-list.jsx";

const StyledLabelList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LabelsList = () => {
  return (
    <StyledLabelList>
      <SearchHeader />
      <SearchResults />
    </StyledLabelList>
  );
};

export default LabelsList;
