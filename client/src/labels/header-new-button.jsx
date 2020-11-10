import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

const StyledNewButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(46, 164, 79);
    color: rgb(255, 255, 255);

    width: 100px;
    height: 32px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgba(43, 145, 73, 0.8);

    font-family: "Noto Sans KR", sans-serif;
    font-size: 13px;

    &:hover {
        cursor: pointer;
        background-color: rgba(43, 145, 73, 1);
    }

    &:focus {
        outline: none;
    }
`;

const NewButton = (props) => {
    const onNewLabelClick = (e) => {
        props.setIsNewAreaVisible(true);
    };

    return (
        <Router>
            <StyledNewButton onClick={onNewLabelClick}>
                New Label
            </StyledNewButton>
        </Router>
    );
};

export default NewButton;
