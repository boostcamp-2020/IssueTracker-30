import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledSignUpForm = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledParagraph = styled.p``;

const StyledInputId = styled.input.attrs({
    type: "text",
})`
    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const StyledInputPw = styled.input.attrs({
    type: "password",
})`
    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const StyledAlertText = styled.div`
    height: 15px;
    color: red;
    text-align: center;
    font-size: 0.75em;
`;

const SignUpForm = () => {
    const [userId, setUserId] = useState("");
    const [userPw1, setUserPw1] = useState("");
    const [userPw2, setUserPw2] = useState("");
    const [verifyIdAlert, setVerifyIdAlert] = useState("");
    const [verifyPw1Alert, setVerifyPw1Alert] = useState("");
    const [verifyPw2Alert, setVerifyPw2Alert] = useState("");
    const [verifyJoinAlert, setVerifyJoinAlert] = useState("");
    // let [statusId, statusPw1, statusPw2] = [false, false, false];
    const [statusId, setStatusId] = useState(false);
    const [statusPw1, setStatusPw1] = useState(false);
    const [statusPw2, setStatusPw2] = useState(false);

    const isIdOK = (e) => {
        const {
            target: { value: id },
        } = e;
        const regUserId = /[\w._-]+/;

        if (id.length <= 16) {
            setUserId(id);
        }
        if (id.length < 6 || id.length > 16) {
            setStatusId(false);
            setVerifyIdAlert("id는 6자 이상 16자 이하 입니다.");
            return;
        }
        if (regUserId.test(id)) {
            setVerifyIdAlert("");
            setStatusId(true);
        }
    };

    const isPw1OK = (e) => {
        const {
            target: { value: pw },
        } = e;
        const regUserPw = /[\w._\-@!+]+/;

        if (pw.length <= 12) {
            setUserPw1(pw);
        }
        if (pw.length < 6 || pw.length > 12) {
            setStatusPw1(false);
            setVerifyPw1Alert("pw는 6자 이상 12자 이하 입니다.");
            return;
        }
        if (regUserPw.test(pw)) {
            setVerifyPw1Alert("");
            setStatusPw1(true);
        }
    };

    const isPw2OK = (e) => {
        const {
            target: { value: pw2 },
        } = e;
        if (pw2.length <= 12) {
            setUserPw2(pw2);
        }
        if (pw2 !== userPw1) {
            setStatusPw2(false);
            setVerifyPw2Alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        setVerifyPw2Alert("비밀번호가 서로 일치합니다!");
        setStatusPw2(true);
    };

    const isAllFilled = () => {
        if (statusId && statusPw1 && statusPw2) {
            return true;
        }
        return false;
    };

    const onSubmitButtonClick = (e) => {
        e.preventDefault();
        if (isAllFilled() && statusId && statusPw1 && statusPw2) {
            //TODO
            return;
        }
        setVerifyJoinAlert("요구사항이 만족되지 않았습니다!");
    };

    const StyledSubmitButton = styled.button.attrs({
        // onClick: onSubmitButtonClick,
    })`
        margin: 15px;
    `;
    return (
        <StyledSignUpForm>
            <StyledParagraph>아이디</StyledParagraph>
            <StyledInputId value={userId} onChange={isIdOK} />
            <StyledAlertText>{verifyIdAlert} </StyledAlertText>

            <StyledParagraph>비밀번호</StyledParagraph>
            <StyledInputPw value={userPw1} onChange={isPw1OK} />
            <StyledAlertText>{verifyPw1Alert} </StyledAlertText>

            <StyledParagraph>비밀번호확인</StyledParagraph>
            <StyledInputPw value={userPw2} onChange={isPw2OK} />
            <StyledAlertText>{verifyPw2Alert} </StyledAlertText>

            <StyledSubmitButton onClick={onSubmitButtonClick}>
                회원가입
            </StyledSubmitButton>
            <StyledAlertText>{verifyJoinAlert}</StyledAlertText>
        </StyledSignUpForm>
    );
};

export default SignUpForm;
