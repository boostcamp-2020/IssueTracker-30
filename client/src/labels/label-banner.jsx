import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import styled from "styled-components";
import LabelEditor from "./label-editor.jsx";

const StyledLabelBanner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;

    width: 100%;
    min-height: 50px;
    padding: 10px 0;
    box-shadow: 0 1px 1px -1px rgb(36, 41, 46);

    &:hover {
        background-color: rgba(236, 239, 241, 1);
        cursor: default;
    }

    &:focus {
        outline: none;
    }
`;

const StyledLabelInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 50px;
`;

const StyledLabelTagDiv = styled(Link)`
    width: 250px;

    text-decoration: none;
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
    display: ${(props) => (props.visible ? "block" : "none")};
    width: auto;

    border: none;
    background-color: transparent;
    color: rgb(88, 96, 105);

    font-weight: 100;
    font-size: 12px;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const StyledLabelEditorWrapper = styled.div`
    display: ${(props) => (props.isEditorVisible ? "flex" : "none")};
    width: 100%;
`;

const LabelBanner = ({
    data: { color, content: name, description: desc },
    getRandomColor,
}) => {
    const [isEditorVisible, setEditorVisible] = useState(false);
    const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
    const [contents, setContents] = useState({
        name,
        desc,
        color,
    });

    const onEditButtonClick = () => {
        setEditorVisible(true);
        setIsEditButtonVisible(false);
    };

    return (
        <StyledLabelBanner>
            <StyledLabelInfo>
                <StyledLabelTagDiv to="/">
                    <StyledLabelTag color={color}>{name}</StyledLabelTag>
                </StyledLabelTagDiv>
                <StyledLabelDetail>{desc || name}</StyledLabelDetail>
                <StyledLabelEditDeleteDiv>
                    <StyledLabelEditDeleteButton
                        visible={isEditButtonVisible}
                        onClick={onEditButtonClick}
                    >
                        Edit
                    </StyledLabelEditDeleteButton>
                    <StyledLabelEditDeleteButton visible={true}>
                        Delete
                    </StyledLabelEditDeleteButton>
                </StyledLabelEditDeleteDiv>
            </StyledLabelInfo>

            <StyledLabelEditorWrapper isEditorVisible={isEditorVisible}>
                <LabelEditor
                    mode={"edit"}
                    contents={contents}
                    setContents={setContents}
                    getRandomColor={getRandomColor}
                    isEditorVisible={isEditorVisible}
                    setIsNewAreaVisible={setEditorVisible}
                    setIsEditButtonVisible={setIsEditButtonVisible}
                />
            </StyledLabelEditorWrapper>
        </StyledLabelBanner>
    );
};

export default LabelBanner;
