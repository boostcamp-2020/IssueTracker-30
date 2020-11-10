import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";

const StyledLabelBanner = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 50px;
    box-shadow: 0 1px 1px -1px rgb(36, 41, 46);

    text-decoration: none;

    &:hover {
        background-color: rgba(236, 239, 241, 1);
        cursor: default;
    }

    &:focus {
        outline: none;
    }
`;
const StyledLabelTagDiv = styled.div`
    width: 250px;
`;

const StyledLabelTag = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;

    border-radius: 10px;
    background-color: ${(props) => props.color};
    color: rgb(255, 255, 255);
    font-weight: 400;

    &:hover {
        cursor: pointer;
    }
`;

const StyledLabelDetail = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 530px;

    color: rgb(88, 96, 105);
`;

const StyledLabelEditDeleteDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 120px;
`;

const StyledLabelEditDeleteButton = styled.button`
    width: auto;

    border: none;
    background-color: transparent;
    color: rgb(88, 96, 105);

    font-weight: 100;
    font-size: 12px;

    &:hover {
        cursor: pointer;
    }
`;

const LabelBanner = ({ data }) => {
    const { color, content, detail } = data;
    return (
        <StyledLabelBanner to="/">
            <StyledLabelTagDiv>
                <StyledLabelTag color={color}>{content}</StyledLabelTag>
            </StyledLabelTagDiv>
            <StyledLabelDetail>{detail || content}</StyledLabelDetail>
            <StyledLabelEditDeleteDiv>
                <StyledLabelEditDeleteButton>Edit</StyledLabelEditDeleteButton>
                <StyledLabelEditDeleteButton>
                    Delete
                </StyledLabelEditDeleteButton>
            </StyledLabelEditDeleteDiv>
        </StyledLabelBanner>
    );
};

export default LabelBanner;
