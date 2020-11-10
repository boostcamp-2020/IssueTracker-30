import React, { useState } from "react";
import styled from "styled-components";

import LabelPreviewer from "./label-previewer.jsx";
import LabelEditor from "./label-editor.jsx";

const StyledNewIssueWrapper = styled.div`
    display: ${(props) => (props.isNewAreaVisible ? "flex" : "none")};
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 900px;
    height: 150px;
    margin-top: 20px;

    border-radius: 5px;
    box-shadow: 0 0px 2px 0px rgb(36, 41, 46);
    background-color: rgb(246, 248, 250);

    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 12px;
`;

const NewIssueArea = ({ isNewAreaVisible, setIsNewAreaVisible }) => {
    const getRandomColor = `#${[...Array(6).keys()]
        .map((e) => Math.floor(Math.random() * 16).toString(16))
        .join("")}`;

    const [contents, setContents] = useState({
        name: "Label Preview",
        desc: "",
        color: getRandomColor,
    });

    return (
        <StyledNewIssueWrapper isNewAreaVisible={isNewAreaVisible}>
            <LabelPreviewer contents={contents} />
            <LabelEditor
                contents={contents}
                setContents={setContents}
                getRandomColor={getRandomColor}
                setIsNewAreaVisible={setIsNewAreaVisible}
            />
        </StyledNewIssueWrapper>
    );
};

export default NewIssueArea;
