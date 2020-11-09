import React from "react";
import styled from "styled-components";

const StyledLabels = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledHeader = styled.header`
    display: flex;
`;

const StyledHeaderRadio = styled.input.attrs({
    type: "radio",
})``;

const LabelsList = () => {
    return (
        <StyledLabels>
            <StyledHeader>
                <StyledHeaderRadio />
            </StyledHeader>
        </StyledLabels>
    );
};

export default LabelsList;
