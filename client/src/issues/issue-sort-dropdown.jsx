import React, { useState } from "react";
import styled from "styled-components";

const StyledDropDownMenu = styled.div`
    display: inline-block;
    width: 150px;

    &:hover {
        cursor: pointer;
    }
`;

const StyledModalBackground = styled.div`
    display: ${(props) => props.isVisible};
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
`;

const StyledMenuTitle = styled.div`
    position: relative;
    &:before {
        content: "${(props) => props.title} 🔽";
    }
`;

const StyledMenuContent = styled.div`
    display: ${(props) => props.isVisible};
    position: absolute;
    top: 30px;
    width: 200px;
    height: fit-content;
    max-height: 300px;
    z-index: 3;
    background-color: white;
    overflow: auto;
    border: 1px solid rgba(97, 97, 97, 1);
    border-radius: 5px;
`;

const StyledMenuUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 4% 0%;
`;

const StyledMenuUlHead = styled.div`
    border-bottom: 1px solid lightgray;
    font-weight: bold;
    text-align: left;
`;

const StyledMenuLi = styled.li`
    border-bottom: 1px solid lightgray;
    padding: 2% 0%;
    text-align: center;

    &:hover {
        background-color: #fafbfc;
    }
`;

const DropDownMenu = (props) => {
    const [menuVisibility, setMenuVisibility] = useState("none");

    const handleMenuVisibility = () => {
        if (menuVisibility === "none") {
            setMenuVisibility("block");
        } else {
            setMenuVisibility("none");
        }
    };

    return (
        <StyledDropDownMenu onClick={handleMenuVisibility}>
            <StyledModalBackground
                isVisible={menuVisibility}
                onClick={handleMenuVisibility}
            ></StyledModalBackground>
            <StyledMenuTitle title={props.name}>
                <StyledMenuContent isVisible={menuVisibility}>
                    <StyledMenuUl>
                        <StyledMenuUlHead>
                            Filter by {props.name}
                        </StyledMenuUlHead>
                        <StyledMenuLi>{props.notUseTitle}</StyledMenuLi>
                        {props.options.map(([key, option]) => (
                            <StyledMenuLi key={key}>{option}</StyledMenuLi>
                        ))}
                    </StyledMenuUl>
                </StyledMenuContent>
            </StyledMenuTitle>
        </StyledDropDownMenu>
    );
};

export default DropDownMenu;
