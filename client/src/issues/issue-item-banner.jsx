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

const StyledBannerInnerDiv = styled.div`
    display: flex;
    flex-direction: rows;
    align-items: center;
    padding-top: 1%;
    width: 600px;
`;

const StyledBannerTitle = styled.p`
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 700;
    font-size: 1em;
    margin: 0;
`;

const StyledBannerLabel = styled.div`
    display: flex;
    background-color: ${(props) => props.color};
    height: 15px;
    margin-left: 1%;
    padding: 0.3% 0.8% 0.8% 0.8%;
    color: white;
    text-shadow: 1px 1px 3px black;
    font-size: 10pt;
    border-radius: 3px;
    align-items: center;

    p {
        margin: 0;
    }
`;

const StyledBannerInfo = styled.p`
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 0.7em;
    margin: 0;
`;

const StyledAssigneeDiv = styled.div`
    position: absolute;
    display: flex;
    padding-top: 1.5%;
    width: 10%;
    justify-content: flex-end;
    right: 13.5%;
`;

const StyledAssignee = styled.img`
    width: 20px;
    margin-left: 8%;
    box-shadow: 0 0 2px 0px black;
    border-radius: 3px;
`;

let count = 0;
let total;

const IssueTitle = (props) => {
    const [checked, setChecked] = useState(false);
    const openOrClosed = props.status === 1 ? "opened" : "closed";

    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(props.writingTime)
    ).getDate();

    useEffect(() => {
        if (props.checked) {
            setChecked(props.checked);
            count = props.count;
        } else {
            if (count == props.count || count == 0) {
                setChecked(props.checked);
                count = 0;
            }
        }
    }, [props.checked]);

    const checkedFunc = () => {
        return checked;
    };

    const setCheckFunc = () => {
        if (checked) {
            //취소를 누르면
            props.excludeIssueFunc(props.issueId);
            props.func2(false);
            count--;
        } else {
            count++;
            props.addIssueFunc(props.issueId);
            if (count == props.count) {
                props.func2(true);
            }
        }
        props.selectedFunc(count);
        setChecked(!checked);
    };

    const labelData = [];
    for (let i = 0; i < props.labelInfo.color.length; i++) {
        const data = {
            color: props.labelInfo.color[i],
            content: props.labelInfo.content[i],
        };
        labelData.push(data);
    }

    const usersData = JSON.parse(localStorage.getItem("usersData"));

    const assigneeUrl = [];
    props.assignId.forEach((ele) => {
        assigneeUrl.push(usersData.filter((data) => data.userId === ele));
    });

    const onIssueBannerClick = (e) => {
        //
    };

    return (
        <StyledBannersListDiv>
            <StyledBannerCheckBoxDiv>
                <StyledBannerCheckBoxInput
                    checked={checkedFunc()}
                    onChange={setCheckFunc}
                />
            </StyledBannerCheckBoxDiv>

            <StyledBannerOpenClosedDiv>
                <StyledBannerOpenClosedIcon />
            </StyledBannerOpenClosedDiv>

            <StyledBannerTextDiv>
                <StyledBannerInnerDiv>
                    <StyledBannerTitle
                        uri={props.issueId}
                        onClick={onIssueBannerClick}
                    >
                        {props.issueTitle}
                    </StyledBannerTitle>
                    {labelData.map((element) => (
                        <StyledBannerLabel
                            key={element.content}
                            color={element.color}
                        >
                            <p>{element.content}</p>
                        </StyledBannerLabel>
                    ))}
                    <StyledAssigneeDiv>
                        {assigneeUrl.map((element) => (
                            <StyledAssignee
                                key={element[0].userId}
                                src={element[0].imageURL}
                            ></StyledAssignee>
                        ))}
                    </StyledAssigneeDiv>
                </StyledBannerInnerDiv>
                <StyledBannerInfo>
                    #{props.issueId} {openOrClosed} {updatedTimeBefore} days ago
                    by {props.userId}
                </StyledBannerInfo>
            </StyledBannerTextDiv>
        </StyledBannersListDiv>
    );
};

export default IssueTitle;
