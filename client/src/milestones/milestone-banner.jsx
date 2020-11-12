import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const StyledMilestoneBanner = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(200, 200, 200);
  padding: 15px;
`;

const StyledMilestoneInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledMilestoneRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
`;

const StyledMilestoneTitle = styled.div`
    font-size: 20pt;
`;

const StyledProgress = styled.progress`
    width: 350px;
    height: 30px;
`;

const StyledProgressText = styled.div``;

const StyledButtons = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledEditButton = styled.button`
    text-decoration: none;
    color: blue;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    padding: 0;
`;

const StyledStatusButton = styled.button`
    border: none;
    outline: none;
    background: none;
    color: blue;
    cursor: pointer;
    padding: 0;
    padding-left: 15px;
`;

const StyledDeleteButton = styled.button`
    border: none;
    outline: none;
    background: none;
    color: red;
    cursor: pointer;
    padding: 0;
    padding-left: 15px;
`;

const StyledSvg = styled.svg.attrs({
    viewBox: "0 0 16 16",
    version: "1.1",
    width: "16",
    height: "16",
    ariaHidden: "true",
});

const MilestoneBanner = props => {
    const editStatus = props.status === 1 ? 0 : 1;
    const editStatusString = editStatus === 1 ? "Open" : "Close";

    let dueDate = props.dueDate;
    dueDate = dueDate.replace('T', ' ');
    dueDate = dueDate.split(' ')[0];

    const issueData = JSON.parse(localStorage.getItem("issueData"));
    const issue = issueData.filter((ele) => ele.milestoneId === props.ID);
    const maxIssue = issue.length;
    const closeIssue = issue.filter((ele) => ele.status === 0).length;
    const openIssue = maxIssue - closeIssue;
    const per = maxIssue === 0 ? 0 : Math.round(closeIssue / maxIssue * 100);



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
            <StyledMilestoneInfo>
                <StyledMilestoneTitle>
                    {props.title}
                </StyledMilestoneTitle>
                Due by {dueDate}{" "}
                <span>
                    {props.description}
                </span>
            </StyledMilestoneInfo>
            <StyledMilestoneRight>
                <StyledProgress
                    value={closeIssue}
                    max={maxIssue}
                >
                </StyledProgress>
                <StyledProgressText>
                    {per}% complete {"     "}{openIssue} open {closeIssue} closed

                </StyledProgressText>
                <StyledButtons>
                    <Link to={`/milestone/edit/${props.ID}`}>
                        <StyledEditButton>
                            Edit
                    </StyledEditButton>
                    </Link>
                    <StyledStatusButton onClick={statusMilestoneClickHandler}>
                        {editStatusString}
                    </StyledStatusButton>
                    <StyledDeleteButton onClick={deleteMilestoneClickHandler}>
                        Delete
                    </StyledDeleteButton>
                </StyledButtons>
            </StyledMilestoneRight>
        </StyledMilestoneBanner>

    );
};

export default MilestoneBanner;
