import React from "react";
import styled from "styled-components";

const StyledBannersListDiv = styled.div`
    display: flex;
    width: 1200px;
    height: 100%;
    overflow: auto;
    border-top: 1px solid #eaecef;

    &:hover {
        background-color: rgba(236, 239, 241, 1);
    }
`;

const StyledBannerCheckBoxDiv = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
`;

const StyledBannerCheckBoxInput = styled.input.attrs({
    type: "checkbox",
})``;

const StyledBannerOpenClosedDiv = styled.div``;

const StyledBannerOpenClosedIcon = styled.i``;

const StyledBannerTextDiv = styled.div``;

const StyledBannerTitle = styled.p`
    font-size: 1em;
    margin: 0;
`;

const StyledBannerInfo = styled.p`
    font-size: 0.7em;
    margin: 0;
`;

// color: "#FF0000"
// content: "bug"
// issueId: 1
// issueTitle: "목록 보기 구현"
// labelId: 2
// milestoneId: 1
// milestoneTitle: "스프린트2"
// status: 1
// userId: "123123"
// writingTime: "2020-10-28T15:00:00.000Z"
const IssueTitle = (props) => {
    const openOrClosed = props.status === 1 ? "opened" : "closed";

    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(props.writingTime),
    ).getDate();

    //
    return (
        <StyledBannersListDiv>
            <StyledBannerCheckBoxDiv>
                <StyledBannerCheckBoxInput />
            </StyledBannerCheckBoxDiv>

            <StyledBannerOpenClosedDiv>
                <StyledBannerOpenClosedIcon />
            </StyledBannerOpenClosedDiv>

            <StyledBannerTextDiv>
                <StyledBannerTitle>{props.issueTitle}</StyledBannerTitle>
                <StyledBannerInfo>
                    #{props.issueId} by {props.userId} was {openOrClosed}{" "}
                    {updatedTimeBefore} days ago
                </StyledBannerInfo>
            </StyledBannerTextDiv>
        </StyledBannersListDiv>
    );
};

export default IssueTitle;
