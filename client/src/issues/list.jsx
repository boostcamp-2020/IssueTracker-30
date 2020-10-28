import React from "react";
import styled from "styled-components";

import Filter from "./filter.jsx";

const StyledListDiv = styled.div`
    display: ${(props) => props.display};
`;

const IssueList = (props) => {
    return (
        // TODO
        <StyledListDiv>
            <div>이슈 리스트</div>
            <Filter />
        </StyledListDiv>
    );
};

export default IssueList;
