import React from "react";
import styled from "styled-components";

import HeaderButtons from "./header-buttons.jsx";
import HeaderSearchInput from "./header-search-input.jsx";
import HeaderNewButton from "./header-new-button.jsx";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 900px;

  margin-top: 20px;
`;

const StyledSearchInputs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 590px;
`;

const SearchHeader = () => {
  return (
    <StyledHeader>
      <StyledSearchInputs>
        <HeaderButtons />
        <HeaderSearchInput />
      </StyledSearchInputs>
      <HeaderNewButton />
    </StyledHeader>
  );
};

export default SearchHeader;
