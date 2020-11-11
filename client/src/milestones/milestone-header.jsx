import React from "react";
import styled from "styled-components";

import HeaderButtons from "./header-buttons.jsx";
import HeaderNewButton from "./header-new-button.jsx";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 900px;

  margin-top: 20px;
`;

const SearchHeader = () => {
    return (
        <StyledHeader>
            <HeaderButtons />
            <HeaderNewButton />
        </StyledHeader>
    );
};

export default SearchHeader;
