import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

const StyledEditorWrapper = styled.div`
    display: ${(props) => (props.isEditorVisible ? "flex" : "none")};
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: 50px;
    padding: 0 10px;
`;

const StyledEditName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 200px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditNameInput = styled.input.attrs({
    placeholder: "Label Name",
})`
    width: 98%;
    height: 25px;
    padding: 0 10px;
    font-size: 13px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);
`;

const StyledEditDesc = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    width: 350px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditDescInput = styled.input.attrs({
    placeholder: "Description(optional)",
})`
    width: 98%;
    height: 25px;
    padding: 0 10px;
    font-size: 13px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);
`;

const StyledEditColor = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: flex-start;
    width: 100px;
    height: 100%;
    font-weight: bold;
`;

const StyledEditColorInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
`;

const StyledEditColorRefreshButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 25px;
    height: 25px;
    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);
    background-color: ${(props) => props.color};

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const StyledEditColorRefreshSvg = styled.svg`
    width: 25px;
    height: 25px;
`;

const StyledEditColorInput = styled.input`
    width: 60px;
    height: 25px;
    padding: 0 5px;

    font-size: 13px;
    text-align: center;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(36, 41, 46);
`;

const StyledButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    height: 100%;
`;

const StyledEmptySpan = styled.span`
    font-size: 12px;
`;

const StyledButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledCancelButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-size: 13px;

    height: 27px;
    padding: 0 10px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0px 2px 0px rgb(36, 41, 46);

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const StyledSaveButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: ${(props) =>
        props.isDisabled ? "rgb(130, 130, 130)" : "rgb(46, 164, 79)"};
    color: rgb(255, 255, 255);
    font-size: 13px;

    width: max-content;
    height: 27px;
    padding: 0 10px;

    border: 0;
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgba(43, 145, 73, 0.8);

    &:hover {
        cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
    }

    &:focus {
        outline: none;
    }
`;

const LabelEditor = ({
    mode,
    contents,
    setContents,
    getRandomColor,
    isEditorVisible,
    setIsNewAreaVisible,
    setIsEditButtonVisible,
}) => {
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
    const { ID, name, desc, color } = contents;
    const nameInputRef = useRef();

    const onNameInputChange = (e) => {
        setContents({ ...contents, name: e.currentTarget.value });
    };

    const onDescInputChange = (e) => {
        setContents({ ...contents, desc: e.currentTarget.value });
    };

    const onColorInputChange = (e) => {
        setContents({ ...contents, color: e.currentTarget.value });
    };

    const onColorRefreshClick = (e) => {
        setContents({ ...contents, color: getRandomColor() });
    };

    const onCancelButtonClick = () => {
        setContents({ ...contents, name: "Label Preview", desc: "" });
        setIsNewAreaVisible(false);
        setIsEditButtonVisible ? setIsEditButtonVisible(true) : "";
    };

    useEffect(() => {
        nameInputRef.current.focus();
    });

    useEffect(() => {
        if (name !== "" && name !== "Label Preview" && name.length !== 0) {
            setIsSaveButtonDisabled(false);
            return;
        }
        setIsSaveButtonDisabled(true);
    }, [name]);

    const onSaveLabelClick = () => {
        if (!name || name === "Label Preview" || !color) {
            alert("레이블명 또는 색상이 입력되지 않았습니다.");
            return;
        }

        const data = {
            labelId: ID,
            content: name,
            color,
            description: desc,
        };

        const axiosOptions =
            mode === "new"
                ? {
                      method: "POST",
                      url: "http://localhost:3000/label",
                      data,
                      withCredentials: true,
                  }
                : {
                      method: "PUT",
                      url: "http://localhost:3000/label",
                      data,
                      withCredentials: true,
                  };

        const successMessage =
            mode === "new"
                ? `새로운 레이블 "${name}"이 추가되었습니다!`
                : `레이블 ${name}이 수정되었습니다!`;

        axios(axiosOptions)
            .then((res) => {
                let isSuccess = false;
                if (res.data.message === "success") {
                    alert(successMessage);
                    isSuccess = true;
                }
                return isSuccess;
            })
            .then((isSuccess) => {
                if (isSuccess) {
                    axios({
                        method: "GET",
                        url: "http://localhost:3000/label",
                        withCredentials: true,
                    }).then((labels) => {
                        localStorage.setItem(
                            "labelsData",
                            JSON.stringify(labels.data)
                        );
                        location.href = "/labels";
                    });
                }
            });
    };

    return (
        <StyledEditorWrapper isEditorVisible={isEditorVisible}>
            <StyledEditName>
                Label Name
                <StyledEditNameInput
                    value={name === "Label Preview" ? "" : name}
                    onChange={onNameInputChange}
                    ref={nameInputRef}
                />
            </StyledEditName>
            <StyledEditDesc>
                Description
                <StyledEditDescInput
                    value={desc || ""}
                    onChange={onDescInputChange}
                />
            </StyledEditDesc>

            <StyledEditColor>
                Color
                <StyledEditColorInputWrapper>
                    <StyledEditColorRefreshButton color={color}>
                        <StyledEditColorRefreshSvg
                            viewBox="0 0 16 16"
                            version="1.1"
                            aria-hidden="true"
                            onClick={onColorRefreshClick}
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"
                            ></path>
                        </StyledEditColorRefreshSvg>
                    </StyledEditColorRefreshButton>
                    <StyledEditColorInput
                        value={color}
                        onChange={onColorInputChange}
                    />
                </StyledEditColorInputWrapper>
            </StyledEditColor>
            <StyledButtonsWrapper>
                <StyledEmptySpan></StyledEmptySpan>
                <StyledButtons>
                    <StyledCancelButton onClick={onCancelButtonClick}>
                        Cancel
                    </StyledCancelButton>
                    <StyledSaveButton
                        onClick={onSaveLabelClick}
                        isDisabled={isSaveButtonDisabled}
                    >
                        {mode === "new" ? "Create Label" : "Save Changes"}
                    </StyledSaveButton>
                </StyledButtons>
            </StyledButtonsWrapper>
        </StyledEditorWrapper>
    );
};

export default LabelEditor;
