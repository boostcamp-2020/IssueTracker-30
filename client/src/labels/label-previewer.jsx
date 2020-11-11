import React from "react";
import styled from "styled-components";

const StyledPreviewerWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 30px;
    width: 100%;
`;

const StyledLabelNameColor = styled.div`
    display: flex;
    justify-content: flex-start;

    width: 250px;
    height: 100%;
`;

const StyledLabelNameColorPreview = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    margin: 0 10px;
    border-radius: 10px;
    background-color: ${(props) => props.color};
`;

const StyledLabelDetail = styled.div`
    width: 530px;
`;

const LabelPreviewer = ({ contents: { name, desc, color } }) => {
    return (
        <StyledPreviewerWrapper>
            <StyledLabelNameColor>
                <StyledLabelNameColorPreview color={color}>
                    {name}
                </StyledLabelNameColorPreview>
            </StyledLabelNameColor>
            <StyledLabelDetail>{desc}</StyledLabelDetail>
        </StyledPreviewerWrapper>
    );
};

export default LabelPreviewer;
