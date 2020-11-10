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

    width: 900px;
    height: 100%;
`;

const ListSearchResult = ({ labelsData, numOfLabel, getRandomColor }) => {
    if (numOfLabel === 0)
        return <StyledNoLabelsMsg>No Labels</StyledNoLabelsMsg>;

    return (
        <StyledLablesList>
            {labelsData.map((ele) => (
                <LabelBanner
                    key={ele.ID}
                    data={ele}
                    getRandomColor={getRandomColor}
                />
            ))}
        </StyledLablesList>
    );
};

export default ListSearchResult;
