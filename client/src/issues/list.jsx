import React from "react";
import styled from "styled-components";

import Filter from "./filter.jsx";
import HeaderButtons from "./header-buttons.jsx";
import IssuesList from "./issues-list-section.jsx";

const StyledListDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const StyledListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    width: 1200px;
    margin-top: 20px;
`;

const IssueList = () => {
    return (
        // TODO
        <StyledListDiv>
            <StyledListHeader>
                <Filter />
                <HeaderButtons />
            </StyledListHeader>
            <IssuesList />
        </StyledListDiv>
    );
};

export default IssueList;
