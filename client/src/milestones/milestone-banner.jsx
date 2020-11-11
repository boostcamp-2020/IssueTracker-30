import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";


const StyledMilestoneBanner = styled.div`
  display: flex;
  flex-direction: row;
`;

const MilestoneBanner = props => {
    return (
        <StyledMilestoneBanner>
            {props.ID}{" "}{props.title}{" "}{props.dueDate}{" "}{props.description}
        </StyledMilestoneBanner>

    );
};

export default MilestoneBanner;
