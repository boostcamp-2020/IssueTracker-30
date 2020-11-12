import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import host from "../../config.js";

const StyledNewIssueContent = styled.textarea.attrs({
    placeholder: "Leave a comment",
})`
    width: 95.2%;
    height: 75%;
    background-color: #fafbfc;
    border: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    border-bottom-style: dashed;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    margin: 1% 1% 0% 1%;
    resize: none;
    font-size: 14px;
    padding: 1%;
`;

const StyledNewIssueAttach = styled.input.attrs({
    type: "file",
    accept: "image/x-png,image/gif,image/jpeg"
})`
    display: none;
`

const StyledLabel = styled.label.attrs({
    htmlFor: "attachFile"
})`
    display: flex;
    align-items: center;
    width: 95.2%;
    height: 10%;
    background-color: #fafbfc;
    border: 1px solid #dbdde2;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top:1px solid red;
    margin: -1% 1% 1% 1%;
    font-size: 14px;
    padding: 1%;
`

const StyledNumCheck = styled.p`
    position: absolute;
    top: 65%;
    right: 1%;
    width: 32px;
    height: 32px;
`

const newIssueContent = (props) => {
    const t = setTimeout(() => {
        const target = document.getElementById('newIssueCheck');

        target.innerText = document.getElementById('newIssueContent').value.length;

        setTimeout(() => {
            target.innerText = "";
        }, 2000)
    }, 2000);
    const handleChange = (e) => {
        clearTimeout(t);
        props.setContent(e.target.value);
    }

    const fileInput = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.value.split('\\')[2];
        var reader = new FileReader();
        reader.addEventListener("load", () => {
            axios({
                method: "POST",
                url: `http://${host}:3000/s3test`,
                data: {
                    fileName,
                    data: reader.result
                },
                withCredentials: true,
            }).then((res) => {
                if (res.data.message === "success") {
                    props.setContent(props.content + `![](https://kr.object.ncloudstorage.com/ssh1997test/${fileName})`)
                }
            });
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            <StyledNewIssueContent id="newIssueContent" value={props.content} onChange={handleChange}/>
            <StyledNewIssueAttach id="attachFile" onChange={fileInput}/>
            <StyledNumCheck id="newIssueCheck"></StyledNumCheck>
            <StyledLabel>Attach files by selecting here</StyledLabel>
        </>
    );
};

export default newIssueContent;
