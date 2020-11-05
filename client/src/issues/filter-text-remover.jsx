import React, { useState } from "react";
import styled from "styled-components";

const StyledRemoverDiv = styled.div`
    display: ${(props) => (props.isRemoverVisible ? "flex" : "none")};
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 600px;
    margin: 10px;
`;

const StyledRemoverIcon = styled.svg.attrs({
    version: "1.1",
    width: "15px",
    height: "15px",
    id: "Capa_1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 512 512",
})`
    margin-right: 10px;
`;

const StyledRemoverMessage = styled.p`
    margin: 0;
`;

// setVisible={setIsFilterTextRemoverVisible}
const FilterTextRemover = (props) => {
    const isVisible = props.isVisible;
    const setVisible = props.setVisible;
    const setTextInput = props.setTextInput;

    const onMessageClick = () => {
        setVisible(false);
        setTextInput("");
    };

    return (
        <StyledRemoverDiv isRemoverVisible={isVisible} onClick={onMessageClick}>
            <StyledRemoverIcon>
                <g>
                    <g>
                        <path
                            d="M256,0C114.508,0,0,114.497,0,256c0,141.493,114.497,256,256,256c141.492,0,256-114.497,256-256
			C512,114.507,397.503,0,256,0z M256,472c-119.384,0-216-96.607-216-216c0-119.385,96.607-216,216-216
			c119.384,0,216,96.607,216,216C472,375.385,375.393,472,256,472z"
                        />
                    </g>
                </g>
                <g>
                    <g>
                        <path
                            d="M343.586,315.302L284.284,256l59.302-59.302c7.81-7.81,7.811-20.473,0.001-28.284c-7.812-7.811-20.475-7.81-28.284,0
			L256,227.716l-59.303-59.302c-7.809-7.811-20.474-7.811-28.284,0c-7.81,7.811-7.81,20.474,0.001,28.284L227.716,256
			l-59.302,59.302c-7.811,7.811-7.812,20.474-0.001,28.284c7.813,7.812,20.476,7.809,28.284,0L256,284.284l59.303,59.302
			c7.808,7.81,20.473,7.811,28.284,0C351.398,335.775,351.397,323.112,343.586,315.302z"
                        />
                    </g>
                </g>
            </StyledRemoverIcon>

            <StyledRemoverMessage>
                Clear current search query and filters
            </StyledRemoverMessage>
        </StyledRemoverDiv>
    );
};

export default FilterTextRemover;
