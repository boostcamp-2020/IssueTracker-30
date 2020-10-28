import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import SignUpModal from "./signup-modal.jsx";
import axios from "axios";

const StyledLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 45%;
    box-shadow: 0px 0px 2px 0px gray;
    border-radius: 8px;
    background-color: white;
`;

const StyledParagraph = styled.p`
    width: 86%;
    margin: 7% 7% 0 7%;
    font-weight: bold;
`;

const StyledInput = styled.input`
    width: 85%;
    height: 14%;
    margin: 2% 7% 0 7%;
    box-shadow: 0 0 2px 0 grey;
    border: none;
    border-radius: 5px;

    &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
    }
`;

const StyledSignInAndUpDiv = styled.div`
    text-align: center;
`;

const StyledSignInAndUpButton = styled.button`
    margin: 3% 10% 0 10%;
    border: none;
    background-color: white;
    color: #3081dd;
    font-weight: bold;
    font-size: 15px;

    &:hover {
        cursor: pointer;
        color: #3676be;
    }
`;

const GithubLoginButtonBGBefore = "rgb(160, 160, 160)";
const GithubLoginButtonBGAfter = "rgb(130, 130, 130)";

const StyledGithubLoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 14%;
    margin: 9% 5% 0 5%;
    color: white;
    background-color: ${GithubLoginButtonBGBefore};
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
        background-color: ${GithubLoginButtonBGAfter};
    }
`;

const StyledImage = styled.img`
    width: 10%;
    margin-left: 2%;
`;

const LoginForm = () => {
    const [userId, setUserId] = useState("");
    const [userPw, setUserPw] = useState("");

    const checkUserId = (e) => {
        e.preventDefault();
        let {
            target: { value: id },
        } = e;
        const regUserId = /[\w._-]+/;
        if (regUserId.test(id) && id.length <= 16) {
            setUserId(id);
        }
    };

    const checkUserPw = (e) => {
        e.preventDefault();
        let {
            target: { value: pw },
        } = e;
        const regUserPw = /[\w._\-@!+]+/;
        if (regUserPw.test(pw) && pw.length <= 12) {
            setUserPw(pw);
        }
    };

    const logIn = () => {
        const data = {
            userId,
            userPw,
        };
        axios({
            method: "POST",
            url: "http://localhost:3000/signIn",
            data,
            withCredentials: true,
        })
            .then((res) => {
                if (res.data && res.data.message === "success") {
                    alert(`${res.data.id}님 로그인 되었습니다.`);
                    window.location.reload();
                } else {
                    alert(res.data.message);
                }
            });
    };

    return (
        <StyledLoginForm>
            <StyledParagraph>아이디</StyledParagraph>
            <StyledInput
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={checkUserId}
                value={userId}
            />
            <StyledParagraph>비밀번호</StyledParagraph>
            <StyledInput
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={userPw}
                onChange={checkUserPw}
            />
            <StyledSignInAndUpDiv>
                <StyledSignInAndUpButton onClick={logIn}>
                    로그인
                </StyledSignInAndUpButton>
                <Router>
                    <Link to="/signup">
                        <StyledSignInAndUpButton>
                            회원가입
                        </StyledSignInAndUpButton>
                    </Link>
                    <Switch>
                        <Route path="/signup">
                            <SignUpModal />
                        </Route>
                    </Switch>
                </Router>
            </StyledSignInAndUpDiv>

            <StyledGithubLoginButton>
                Sign Up with Github
                <StyledImage src="../public/images/GithubIcon.png"></StyledImage>
            </StyledGithubLoginButton>
        </StyledLoginForm>
    );
};

export default LoginForm;
