import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";


const StyledLabelBanner = styled.div`
  display: flex;
  flex-direction: row;
`;

const LabelBanner = props => {
  if (props.numOfLabel === 0)
    return <StyledNoLabelsMsg>No Labels</StyledNoLabelsMsg>;

  return (
    
        <StyledLabelBanner />
    
  );
};

export default LabelBanner;
