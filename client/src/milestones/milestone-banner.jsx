import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const StyledMilestoneBanner = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledStatusButton = styled.button``;

const StyledDeleteButton = styled.button``;

const MilestoneBanner = props => {
    const editStatus = props.status === 1 ? 0 : 1;
    const editStatusString = editStatus === 1 ? "Open" : "Close";

    let dueDate = props.dueDate;
    dueDate = dueDate.replace('T', ' ');
    dueDate = dueDate.split('.')[0];

    const statusMilestoneClickHandler = () => {
        axios({
            method: "PUT",
            url: "http://localhost:3000/milestone",
            data: {
                milestoneId: props.ID,
                title: props.title,
                dueDate: dueDate,
                description: props.description,
                status: editStatus
            },
            withCredentials: true,
        }).then((res) => {
            alert('마일스톤이 수정되었습니다.');
            location.href = "/milestones"
        });
    }

    const deleteMilestoneClickHandler = () => {
        axios({
            method: "DELETE",
            url: "http://localhost:3000/milestone",
            data: {
                milestoneId: props.ID,
            },
            withCredentials: true,
        }).then((res) => {
            alert('마일스톤이 삭제되었습니다.');
            location.href = "/milestones"
        });
    }

    return (
        <StyledMilestoneBanner>
            {props.ID}{" "}{props.title}{" "}{props.dueDate}{" "}{props.description}
            <Link to={`/milestone/edit/${props.ID}`}>
                edit
            </Link>
            <StyledStatusButton onClick={statusMilestoneClickHandler}>
                {editStatusString}
            </StyledStatusButton>
            <StyledDeleteButton onClick={deleteMilestoneClickHandler}>
                delete
            </StyledDeleteButton>
        </StyledMilestoneBanner>

    );
};

export default MilestoneBanner;
