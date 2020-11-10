import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const StyledBannerTop = styled.div`
    display: flex;
`;

const StyledBannerInnerDiv = styled.div`
    display: flex;
    flex-direction: rows;
    align-items: center;
    padding-top: 1%;
    width: 920px;
`;

const StyledBannerTitle = styled.p`
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 700;
    font-size: 1em;
    margin: 0;

    &:hover {
        cursor: pointer;
        color: #3949ab;
    }
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

const StyledBannerInfo = styled.div`
    display: flex;
    flex-direction: row;
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    font-size: 0.7em;
    margin: 0;
`;

const StyledBannerAuthor = styled.div`
    margin: 0 2px;
    &:hover {
        cursor: pointer;
        color: #3949ab;
    }
`;

const StyledAssigneeDiv = styled.div`
    display: flex;
    padding-top: 1.5%;
    width: 4vw%;
`;

const StyledAssignee = styled.img`
    width: 20px;
    margin-right: 15%;
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
        e.preventDefault();
        // TODO: 상세페이지 api?
        window.location.href = `http://localhost:3000/issue/detail/${props.issueId}`;
    };

    const onAuthorClick = () => {
        // TODO
        props.addOptionToTextInput(`author:${props.userId}`);
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
                <StyledBannerTop>
                    <StyledBannerInnerDiv>
                        <Link to={`detail/${props.issueId}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <StyledBannerTitle>{props.issueTitle}</StyledBannerTitle>
                        </Link>
                        {/* <StyledBannerTitle onClick={onIssueBannerClick}>
                            {props.issueTitle}
                        </StyledBannerTitle> */}
                        {labelData.map((element) => (
                            <StyledBannerLabel
                                key={element.content}
                                color={element.color}
                            >
                                <p>{element.content}</p>
                            </StyledBannerLabel>
                        ))}
                    </StyledBannerInnerDiv>
                    <StyledAssigneeDiv>
                        {assigneeUrl.map((element) => (
                            <StyledAssignee
                                key={element[0].userId}
                                src={element[0].imageURL}
                            ></StyledAssignee>
                        ))}
                    </StyledAssigneeDiv>
                </StyledBannerTop>
                <StyledBannerInfo>
                    #{props.issueId} {openOrClosed} {updatedTimeBefore} days ago
                    by{"  "}
                    <StyledBannerAuthor onClick={onAuthorClick}>
                        {props.userId}
                    </StyledBannerAuthor>
                </StyledBannerInfo>
            </StyledBannerTextDiv>
        </StyledBannersListDiv>
    );
};

export default IssueTitle;
