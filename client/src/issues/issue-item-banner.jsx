import React, { useState, useEffect } from "react";
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

let count = 0;

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
    const [checked, setChecked] = useState(false);
    
    useEffect(() => {
        if(props.checked) {
            setChecked(props.checked);
            count = props.count;
        }
        else {
            if(count == props.count || count == 0) {
                setChecked(props.checked);
                count = 0;
            }
        }
    }, [props.checked]);

    const openOrClosed = props.status === 1 ? "opened" : "closed";

    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(props.writingTime),
    ).getDate();

    const checkedFunc = () => {
        return checked;
    }

    const setCheckFunc = () => {
        if (checked) {
            //취소를 누르면
            props.excludeIssueFunc(props.issueId);
            props.func2(false);
            count--;
        }
        else {
            count++;
            props.addIssueFunc(props.issueId);
            if (count == props.count) {
                props.func2(true);
            }
        }
        props.selectedFunc(count);
        setChecked(!checked);
    }

    return (
        <StyledBannersListDiv>
            <StyledBannerCheckBoxDiv>
                <StyledBannerCheckBoxInput checked={checkedFunc()} onClick={setCheckFunc} />
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
