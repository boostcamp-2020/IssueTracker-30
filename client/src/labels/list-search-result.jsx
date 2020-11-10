import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

import LabelBanner from "./label-banner.jsx";

const StyledNoLabelsMsg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 300px;

  font-size: 24px;
`;

const StyledLablesList = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ListSearchResult = props => {
  if (props.numOfLabel === 0)
    return <StyledNoLabelsMsg>No Labels</StyledNoLabelsMsg>;

  return (
    <StyledLablesList>
      {props.labelsData.map((ele, idx) => (
        <LabelBanner key={idx} />
      ))}
    </StyledLablesList>
  );
};

export default ListSearchResult;
