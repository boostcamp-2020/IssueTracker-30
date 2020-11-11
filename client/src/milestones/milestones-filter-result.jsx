import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

import MilestoneBanner from "./milestone-banner.jsx";

const StyledNoMilestonesMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;

  font-size: 24px;
`;

const StyledMilestonesList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const MilestonesFilterResult = props => {
    console.log(props);
  if (props.numOfMilestone === 0)
    return <StyledNoMilestonesMsg>No Milestones</StyledNoMilestonesMsg>;

  return (
    <StyledMilestonesList>
      {props.milestonesData.map((ele) => (
        <MilestoneBanner
            ID={ele.ID}
            title={ele.title}
            dueDate={ele.dueDate}
            description={ele.description}
            status={ele.status} />
      ))}
    </StyledMilestonesList>
  );
};

export default MilestonesFilterResult;
