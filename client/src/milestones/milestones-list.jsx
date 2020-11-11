import React, { useState } from "react";
import styled from "styled-components";

import MilestoneHeader from "./milestone-header.jsx";
import FilterResults from "./filter-list.jsx";

const StyledMilestoneList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const MilestoneList = () => {
    return (
        <StyledMilestoneList>
        <MilestoneHeader />
        <FilterResults />
      </StyledMilestoneList>
    );

}


export default MilestoneList;
