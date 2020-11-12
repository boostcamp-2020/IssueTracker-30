import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderOne from "../components/label-milestone-header.jsx";
import NewMilestoneForm from "./milestone-form.jsx";

const StyledHeaderButtonLabel = HeaderOne("Label", 0);
const StyledHeaderButtonMiles = HeaderOne("Milestones", 1);

const StyledNewMilestoneTitleDiv = styled.div`
    margin-left: 3%;
`;

const StyledCreateMilestoneButton = styled.button`
    float: right;
    cursor: pointer;
    outline: none;
    margin-top: 0.5%;
    margin-right: 5%;
    background: linear-gradient(rgba(51,205,86,1) 0%, rgba(41,171,71,1) 100%);
    border-radius: 5px;
    height: 30px;
`;

const newMilestones = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const createMilestoneClickHandler = () => {
        const dueDate = date === '' ? null : date;
        axios({
            method: "POST",
            url: "http://localhost:3000/milestone",
            data: {
                title: title,
                dueDate: dueDate,
                description: description,
                status: 1
            },
            withCredentials: true,
        }).then((res) => {
            alert('마일스톤이 생성되었습니다.');
            setTitle('');
            setDate('');
            setDescription('');
            location.href = "/milestones"
        });
    }
    return (
        <>
            <StyledNewMilestoneTitleDiv>
                <h2 style={{ marginBlockEnd: "5px" }}>New Milestone</h2>
                <div>Create a new milestone to help organize your issues and pull requests. Learn more about {' '}
                    <a href="https://guides.github.com/features/issues/">milestones and issues.</a></div>
                <hr style={{ marginLeft: "0px", width: "95%" }}></hr>
            </StyledNewMilestoneTitleDiv>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "3%" }}>
                <NewMilestoneForm
                    title={title}
                    setTitle={setTitle}
                    date={date}
                    setDate={setDate}
                    description={description}
                    setDescription={setDescription}
                ></NewMilestoneForm>
                <div>
                    <hr style={{ marginLeft: "0px", width: "95%" }}></hr>
                    <StyledCreateMilestoneButton onClick={createMilestoneClickHandler}>Create milestone</StyledCreateMilestoneButton>
                </div>
            </div>
        </>
    );

}


export default newMilestones;
