import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

import host from "../../config.js"
import HeaderOne from "../components/label-milestone-header.jsx";
import NewMilestoneForm from "./milestone-form.jsx";
import HeaderButtons from "./header-buttons.jsx";

const StyledHeaderButtonLabel = HeaderOne("Label", 0);
const StyledHeaderButtonMiles = HeaderOne("Milestones", 1);

const StyledCancelButton = styled.button`
    float: right;
    margin-right: 10px;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
    outline: none;
`;

const StyledCloseMilestoneButton = styled.button`
    float: right;
    margin-right: 10px;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
    outline: none;
`;

const StyledSaveChangesButton = styled.button`
    float: right;
    cursor: pointer;
    outline: none;
    background: linear-gradient(rgba(51,205,86,1) 0%, rgba(41,171,71,1) 100%);
    margin-right: 10px;
    border-radius: 5px;
    height: 30px;
    cursor: pointer;
    outline: none;
`;

const StyledHeaderButtonMargin = styled.div`
    margin-top: 2em;
`;

const EditMilestones = ({ match, history }) => {
    const milestoneId = +match.params.milestoneId;
    if (!localStorage.milestonesData) return <></>;
    const milestonesData = JSON.parse(localStorage.milestonesData);
    const currentMilestone = milestonesData.find(milestone => milestone.ID === milestoneId);
    const [title, setTitle] = useState(currentMilestone.title);
    const [dueDate, setDueDate] = useState(currentMilestone.dueDate?.substring(0, 10));
    const [description, setDescription] = useState(currentMilestone.description);
    const [status, setStatus] = useState(currentMilestone.status);
    const saveChangeClickHandler = () => {
        const date = dueDate === '' ? null : dueDate;

        axios({
            method: "PUT",
            url: `http://${host}:3000/milestone`,
            data: {
                milestoneId: milestoneId,
                title: title,
                dueDate: date,
                description: description,
                status: status
            },
            withCredentials: true,
        }).then((res) => {
            alert('마일스톤이 수정되었습니다.');
            setTitle(title);
            setDueDate(date);
            setDescription(description);
            const tempLocalStorage = JSON.parse(localStorage.milestonesData);
            const index = tempLocalStorage.findIndex(v => v.ID === milestoneId);
            tempLocalStorage[index].title = title;
            tempLocalStorage[index].dueDate = date;
            tempLocalStorage[index].description = description;
            localStorage.setItem(
                "milestonesData",
                JSON.stringify(tempLocalStorage),
            );
            history.goBack();
        });
    }

    const closeReopenMilestoneHandler = () => {
        const date = dueDate === '' ? null : dueDate;

        axios({
            method: "PUT",
            url: `http://${host}:3000/milestone`,
            data: {
                milestoneId: milestoneId,
                title: title,
                dueDate: date,
                description: description,
                status: status === 1 ? 0 : 1
            },
            withCredentials: true,
        }).then((res) => {
            const tempLocalStorage = JSON.parse(localStorage.milestonesData);
            tempLocalStorage[tempLocalStorage.findIndex(v => v.ID === milestoneId)].status = status ? 0 : 1;
            localStorage.setItem(
                "milestonesData",
                JSON.stringify(tempLocalStorage),
            );
            setStatus(status ? 0 : 1);
            history.goBack();
        });
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "3%" }}>
                <StyledHeaderButtonMargin>
                    <HeaderButtons />
                    <hr style={{ marginTop: "2.25em", marginLeft: "0px", width: "95%", borderTop: "0.5pt solid rgb(237, 237, 237)" }}></hr>
                </StyledHeaderButtonMargin>
                
                <NewMilestoneForm
                    title={title}
                    setTitle={setTitle}
                    date={dueDate}
                    setDate={setDueDate}
                    description={description}
                    setDescription={setDescription}
                ></NewMilestoneForm>
                <hr style={{ marginLeft: "0px", width: "95%", borderTop: "0.5pt solid rgb(237, 237, 237)" }}></hr>
                <div style={{ marginTop: "0.5%", marginRight: "4.5%" }} >
                    <StyledSaveChangesButton onClick={saveChangeClickHandler}>Save changes</StyledSaveChangesButton>
                    <StyledCloseMilestoneButton onClick={closeReopenMilestoneHandler}>
                        {status === 1 ? "Close milestone" : "Reopen milestone"}
                    </StyledCloseMilestoneButton>
                    <StyledCancelButton onClick={() => history.goBack()}>Cancel</StyledCancelButton>
                </div>
            </div>
        </>
    );

}


export default withRouter(EditMilestones);
