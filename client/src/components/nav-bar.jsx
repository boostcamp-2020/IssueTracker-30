import React from "react";
import styled from "styled-components";
import axios from "axios";

const StyledNavBar = styled.div`
  width: 100%;
  height: 10vh;
  background-color: black;
`
const LogoutBtn = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
`
const NavBar = ({ mode }) => {
  const logoutOnclickHandler = () => {
    axios({
      method: "GET",
      url: "http://localhost:3000/signOut",
      withCredentials: true,
    })
      .then((res) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const cookie = 'user=; Expires=' + date.toUTCString();
        document.cookie = cookie;
        document.location = '/';
      });
  }

  switch (mode) {
    case "login":
      return (
        <StyledNavBar />
      );

    case "main":
      return (
        <StyledNavBar><LogoutBtn onClick={logoutOnclickHandler}>로그아웃</LogoutBtn></StyledNavBar>
      );
  }
};

export default NavBar;
