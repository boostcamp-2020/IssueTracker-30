import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";

import host from "../config.js"
import createImage from "./createImage.js";

const StyledSignUpForm = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledParagraph = styled.p`
    text-align: left;
    font-weight: bold;
`;

const StyledInputId = styled.input.attrs({
    type: "text",
})`
    height: 4vh;
    border: 1px solid transparent;
    box-shadow: 0 0 3px 0 grey;
    border-radius: 5px;
    background-color: #fafbfc;
    outline-color: rgb(179, 209, 243);

    &:hover {
        border-color: rgb(179, 209, 243);
    }
`;

const StyledInputPw = styled.input.attrs({
    type: "password",
})`
    height: 4vh;
    border: 1px solid transparent;
    box-shadow: 0 0 3px 0 grey;
    border-radius: 5px;
    background-color: #fafbfc;
    outline-color: rgb(179, 209, 243);

    &:hover {
        border-color: rgb(179, 209, 243);
    }
`;

const StyledAlertText = styled.div`
    height: 15px;
    color: red;
    text-align: center;
    font-size: 0.75em;
`;

const SignUpForm = ({ history }) => {
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

    const onSubmitButtonClick = async (e) => {
        e.preventDefault();
        if (isAllFilled() && statusId && statusPw1 && statusPw2) {
            const data = {
                userId,
                userPw1,
            };
            axios({
                method: "POST",
                url: `http://${host}:3000/user/signUp`,
                data,
                withCredentials: true,
            })
                .then((res) => {
                    if (res.data.message === 'success') {
                        axios({
                            method: "POST",
                            url: `http://${host}:3000/user/saveImg`,
                            data : { userId, dataUrl: createImage() },
                            withCredentials: true,
                        }).then(() => {
                            alert('회원가입이 완료되었습니다.');
                            document.location = '/';
                        })                        
                    } else {
                        alert(res.data.message);
                    }
                });
            return;
        }
        setVerifyJoinAlert("요구사항이 만족되지 않았습니다!");
    };

    const StyledSubmitButton = styled.button.attrs({
        // onClick: onSubmitButtonClick,
    })`
        margin: 15px;
        padding: 8px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 12pt;
        width: 40%;
        position: relative;
        left: 25%;
        background-color: #a0a0a0;
        color: white;
        font-weight: bold;
    `;
    return (
        <StyledSignUpForm>
            <StyledParagraph>아이디</StyledParagraph>
            <StyledInputId
                value={userId}
                onChange={isIdOK}
                placeholder="아이디"
            />
            <StyledAlertText>{verifyIdAlert} </StyledAlertText>

            <StyledParagraph>비밀번호</StyledParagraph>
            <StyledInputPw
                value={userPw1}
                onChange={isPw1OK}
                placeholder="비밀번호"
            />
            <StyledAlertText>{verifyPw1Alert} </StyledAlertText>

            <StyledParagraph>비밀번호 확인</StyledParagraph>
            <StyledInputPw
                value={userPw2}
                onChange={isPw2OK}
                placeholder="비밀번호 확인"
            />
            <StyledAlertText>{verifyPw2Alert} </StyledAlertText>

            <StyledSubmitButton onClick={onSubmitButtonClick}>
                가입하기
            </StyledSubmitButton>
            <StyledAlertText>{verifyJoinAlert}</StyledAlertText>
        </StyledSignUpForm>
    );
};

export default withRouter(SignUpForm);
