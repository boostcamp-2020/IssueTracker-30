import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import DetailIssueFrom from "./detailIssueForm/detail-issue-form.jsx";

const StyledNewIssueForm = styled.div`
    /* position: absolute; */
    display: flex;
    background-color: white;
    width: 100%;
    height: 34%;
`

const StyledImgDiv = styled.img`
    width:50px;
    height:50px;
    border: 1px solid lightgray;
    border-radius: 3px;
`

const StyledTriangleDiv = styled.div`
    position: absolute;
    margin-top: 1%;
    left: 8%;
    background-color: aliceblue;
    width: 13px;
    height: 13px;
    border-left: 1px solid #dbdde2;
    border-bottom: 1px solid #dbdde2;
    transform: rotateZ(45deg);
`

const StyledNewIssueSection = styled.div`
    background-color: white;
    /* position: absolute; */
    right: 0%;
    width: 90%;
    height: 85%;
    margin-left: 3%;
    border: 1px solid #dbdde2;
    border-radius: 6px;
`
const StyledInputSection = styled.textarea`
    background-color: white;
    /* position: absolute; */
    right: 0%;
    width: 90%;
    height: 30%;
    border: 1px solid #dbdde2;
    border-radius: 3px;
`

const StyledTitleDiv = styled.div`
    height: 20%;
    border-bottom: 1px solid #dbdde2;
    padding: 1%;
    background-color: aliceblue;
`

const StyledWriteTag = styled.button`
    position: absolute;
    top: 15.3%;
    left: 1%;
    border: 1px solid lightgray;
    border-bottom: none;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: white;
    width: 10%;
    height: 10%;
    font-size: 14px;
`

const StyledContentDiv = styled.div`
    height: 30%;
    padding: 1%;
`

const StyledControlDiv = styled.div`
    height: 15%;
    padding: 0% 1%;
    display: flex;
    align-items: flex-end;
`

const StyledEditBtn = styled.button`
    float: right;
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const StyledEditSectionFooter = styled.div`
`;

const StyledEditCancelBtn = styled.button`
`;

const StyledEditUpdateBtn = styled.button`
`;

const detailIssueComment = (props) => {
    const [mode, setMode] = useState('default');
    const [content, setContent] = useState(props.content);
    const [comment, setComment] = useState(props.comment);
    const userData = JSON.parse(localStorage.getItem("usersData"));

    let imageURL;
    userData.forEach(element => {
        if(element.userId === props.userId){
            imageURL = element.imageURL;
        }
    });

    const editCancelBtnClickHandler = () => {
        const temp = mode === 'default' ? 'edit' : 'default';
        setMode(temp);
    }

    const textareaChangeHandler = event => {
        if (content) {
            setContent(event.target.value);
            return;
        }
        setComment(event.target.value);
    }

    const getDatetime = date => {
        const pad = n => { return n < 10 ? '0' + n : n }
        return date.getUTCFullYear() + '-'
            + pad(date.getUTCMonth() + 1) + '-'
            + pad(date.getUTCDate()) + ' '
            + pad(date.getUTCHours()) + ':'
            + pad(date.getUTCMinutes()) + ':'
            + pad(date.getUTCSeconds())
    }

    const editUpdateHandler = event => {
        const data = {
            mode: 2,
            issueId: props.id,
            content: content,
            ID: props.id,
            comment: comment,
            writingTime: getDatetime(new Date()),
        }
        axios({
            method: "PUT",
            url: content ? "http://localhost:3000/issue" : "http://localhost:3000/comment",
            data,
            withCredentials: true,
        }).then((res) => {
            
        });
        setMode('default');
    }

    return (
        <>
            <StyledNewIssueForm>
                <StyledImgDiv src={imageURL}/>
                {mode === 'default' &&
                    <StyledNewIssueSection >
                        <StyledTitleDiv>
                            {props.userId}
                            {props.userId === localStorage.getItem('userId') ? <StyledEditBtn onClick={editCancelBtnClickHandler}>Edit</StyledEditBtn> : ''}
                        </StyledTitleDiv>
                        <StyledContentDiv>
                            {props.content ? content : comment}
                        </StyledContentDiv>
                    </StyledNewIssueSection>}
                {mode === 'edit' &&
                    <StyledNewIssueSection >
                        <StyledTitleDiv>
                            Write
                    </StyledTitleDiv>
                        <StyledInputSection onChange={textareaChangeHandler}>
                            {props.content ? content : comment}
                        </StyledInputSection>
                        <StyledEditSectionFooter>
                            <StyledEditCancelBtn onClick={editCancelBtnClickHandler}>Cancel</StyledEditCancelBtn>
                            <StyledEditUpdateBtn onClick={editUpdateHandler}>Update comment</StyledEditUpdateBtn>
                        </StyledEditSectionFooter>
                    </StyledNewIssueSection>}
                <StyledTriangleDiv />
            </StyledNewIssueForm>
            {/* <DetailIssueFrom></DetailIssueFrom> */}
        </>
    );
};

export default detailIssueComment;
