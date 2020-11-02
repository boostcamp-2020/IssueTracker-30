import React, { useState } from "react";
import styled from "styled-components";

const StyledDropDownMenu = styled.div`
    position: relative;
    display: inline-block;
    width: 150px;

    &:hover {
        cursor: pointer;
    }
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
    width: 150px;
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

const StyledMenuLi = styled.li`
    border-bottom: 1px solid lightgray;
    padding: 2% 0%;

    &:hover {
        background-color: #fafbfc;
    }
`;

const DropDownMenu = (props) => {
    const [menuVisibility, setMenuVisibility] = useState("none");

    const onTitleClicked = (e) => {
        e.preventDefault();
        if (menuVisibility === "none") {
            setMenuVisibility("block");
        } else {
            setMenuVisibility("none");
        }
    };

    return (
        <StyledDropDownMenu onClick={onTitleClicked}>
            <StyledMenuTitle title={props.name} />
            <StyledMenuContent isVisible={menuVisibility}>
                <StyledMenuUl>
                    {props.options.map(([key, option]) => (
                        <StyledMenuLi key={key}>{option}</StyledMenuLi>
                    ))}
                </StyledMenuUl>
            </StyledMenuContent>
        </StyledDropDownMenu>
    );
};

export default DropDownMenu;
