import React, { useState } from "react";
import styled from "styled-components";

const StyledDropDownMenu = styled.div`
    width: 150px;

    &:hover {
        cursor: pointer;
    }
`;

const StyledModalBackground = styled.div`
    display: ${(props) => props.isVisible};
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    &:hover {
        cursor: default;
    }
`;

const StyledMenuTitle = styled.div`
    position: relative;
    &:before {
        content: "${(props) => props.title} ▼";
    }
`;

const StyledMenuContent = styled.div`
    display: ${(props) => props.isVisible};
    position: absolute;
    top: 30px;
    width: 250px;
    height: fit-content;
    max-height: 300px;
    z-index: 3;
    background-color: white;
    overflow: auto;
    box-shadow: 0 0 2px 0 grey;
    border-radius: 5px;
`;

const StyledMenuUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 2% 0%;
    font-size: 14px;
`;

const StyledMenuUlHead = styled.div`
    padding: 2% 0 3% 5%;
    font-weight: bold;
    text-align: left;
`;

const StyledMenuLiNotUse = styled.div`
    border-top: 1px solid lightgray;
    padding: 3% 5%;
    display: ${(props) => (props.type !== "Author" ? "block" : "none")};

    &:hover {
        background-color: #eceff1;
    }
`;

const StyledMenuLi = styled.li`
    border-top: 1px solid lightgray;
    padding: 3% 0%;
    text-align: center;
    display: flex;
    justify-content: end;
    align-items: center;

    &:hover {
        background-color: #eceff1;
    }

    p {
        margin: 0 0 0 5%;
    }
`;

const StyledMediaSection = styled.div`
    display: ${(props) => (props.mediaSection ? "block" : "none")};

    ${(props) => {
        switch (props.mediaType) {
            case "Author":
            case "Assignee":
                const base = Math.floor(Math.random() * 3);
                const pool = [
                    "https://i.ibb.co/x6Q07jp/1.png",
                    "https://i.ibb.co/5YjKFzJ/2.png",
                    "https://i.ibb.co/yQchVjL/3.png",
                ];
                return {
                    backgroundImage: `url(${pool[base]})`,
                    width: "20px",
                    height: "20px",
                    borderRadius: "65%",
                    marginLeft: "5%",
                };
            case "Label":
                return {
                    backgroundColor: props.media,
                    width: "20px",
                    height: "20px",
                    borderRadius: "65%",
                    marginLeft: "5%",
                };
            case "Milestone":
                return {};
        }
    }}
`;

const DropDownMenu = (props) => {
    const [menuVisibility, setMenuVisibility] = useState("none");

    const addOptionToTextInput = (e) => {
        const currentOption = e.target.innerText;
        const addOption = props.addOptionToTextInput;
        addOption(`${props.name.toLowerCase()}:${currentOption}`);
    };

    const handleMenuVisibility = () => {
        if (menuVisibility === "none") {
            setMenuVisibility("block");
        } else {
            setMenuVisibility("none");
        }
    };

    let mediaSection = true;

    if (props.name === "Milestones") {
        mediaSection = false;
    }

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
                        <StyledMenuLiNotUse
                            type={props.name}
                            onClick={addOptionToTextInput}
                        >
                            {props.notUseTitle}
                        </StyledMenuLiNotUse>
                        {props.dataArray.map((element) => (
                            <StyledMenuLi
                                key={element.key}
                                onClick={addOptionToTextInput}
                            >
                                <StyledMediaSection
                                    mediaSection={mediaSection}
                                    mediaType={props.name}
                                    media={element.media}
                                ></StyledMediaSection>
                                <p>{element.value}</p>
                            </StyledMenuLi>
                        ))}
                    </StyledMenuUl>
                </StyledMenuContent>
            </StyledMenuTitle>
        </StyledDropDownMenu>
    );
};

export default DropDownMenu;
