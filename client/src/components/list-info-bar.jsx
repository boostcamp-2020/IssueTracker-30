import React from "react";
import styled from "styled-components";

const StyledInfoBar = styled.div`
    width: 100%;
    height: 50px;
    background-color: rgb(246, 248, 250);

    border: 0;
    border-radius: 5px 5px 0 0;
    box-shadow: 0 1px 1px -1px rgb(36, 41, 46);
`;

const StyledInfoNums = styled.div`
    display: flex;
    align-items: center;
    width: 120px;
    height: 100%;

    &:before {
        width: 20px;
        content: "";
    }
`;

const ListInfoBar = (props) => {
    return (
        <StyledInfoBar>
            <StyledInfoNums>{props.numOfLabel} labels</StyledInfoNums>
        </StyledInfoBar>
    );
};

export default ListInfoBar;
