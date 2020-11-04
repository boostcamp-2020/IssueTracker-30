import React, { useState } from "react";
import styled from "styled-components";

const StyledDropDownMenu = styled.div`
    display: ${props => props.dropDown? "block" : "none"};
    position: absolute;
    background-color: white;
    box-shadow: 0 0 2px 0 grey;
    width: 240px;
    z-index: 1;
    margin: 3% 0% 0% -2%;
    color: black;

	&:hover {
		cursor: pointer;
	}
`;

const StyledModalBackground = styled.div`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
    z-index: -1;

    cursor: default;
`;

const StyledMenuUl = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0%;
	font-size: 14px;
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
		<StyledDropDownMenu dropDown={props.dropDown}>
            <StyledMenuUl>
                {props.dataArray.map((element) => (
                <>
                    <StyledMenuLi key={element.key}>
                    <StyledMediaSection
                        mediaSection={mediaSection}
                        mediaType={props.name}
                        media={element.media}
                    ></StyledMediaSection>
                    <p>{element.value}</p>
                    </StyledMenuLi>
                </>
                ))}
            </StyledMenuUl>
            <StyledModalBackground onClick={props.defaultClick}/>
		</StyledDropDownMenu>
	);
};

export default DropDownMenu;
