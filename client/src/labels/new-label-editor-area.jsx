import React, { useState } from "react";
import styled from "styled-components";

import LabelPreviewer from "./label-previewer.jsx";
import LabelEditor from "./label-editor.jsx";

const StyledNewLabelWrapper = styled.div`
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

const NewIssueArea = ({
    isNewAreaVisible,
    setIsNewAreaVisible,
    getRandomColor,
}) => {
    const [contents, setContents] = useState({
        name: "Label Preview",
        desc: "",
        color: getRandomColor(),
    });
    return (
        <StyledNewLabelWrapper isNewAreaVisible={isNewAreaVisible}>
            <LabelPreviewer contents={contents} />
            <LabelEditor
                mode={"new"}
                contents={contents}
                setContents={setContents}
                getRandomColor={getRandomColor}
                isEditorVisible={isNewAreaVisible}
                setIsNewAreaVisible={setIsNewAreaVisible}
            />
        </StyledNewLabelWrapper>
    );
};

export default NewIssueArea;
