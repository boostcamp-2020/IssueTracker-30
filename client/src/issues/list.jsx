import React from "react";
import styled from "styled-components";

import Filter from "./filter.jsx";
import HeaderButtons from "./header-buttons.jsx";

const StyledListDiv = styled.div`
    display: ${(props) => props.display};
`;

const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    width: 1200px;
`;

const IssueList = (props) => {
    return (
        // TODO
        <StyledListDiv>
            <div>이슈 리스트</div>
            <StyledListHeader>
                <Filter />
                <HeaderButtons />
            </StyledListHeader>
        </StyledListDiv>
    );
};

export default IssueList;
