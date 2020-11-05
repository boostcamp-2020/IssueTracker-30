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
    align-items: baseline;
    width: 600px;
`;

const StyledBannerTitle = styled.p`
    font-size: 1em;
    margin: 0;
`;

const StyledBannerLabel = styled.div`
    display: flex;
    background-color: ${(props) => props.color};
    height: 15px;
    margin-left: 1%;
    padding: 0.3% 0.8% 0.8% 0.8%;;
    color: white;
    text-shadow: 1px 1px 3px black;
    font-size: 10pt;
    border-radius: 3px;
    align-items: center;

    p {
        margin: 0}
    ;
`

const StyledBannerInfo = styled.p`
    font-size: 0.7em;
    margin: 0;
`;

let count = 0;
let total;

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
    const openOrClosed = props.status === 1 ? "opened" : "closed";

    const timeNow = Date.now();
    const updatedTimeBefore = new Date(
        timeNow - new Date(props.writingTime),
    ).getDate();

    useEffect(() => {
        if (props.checked) {
            setChecked(props.checked);
            count = props.count;
        }
        else {
            if (count == props.count || count == 0) {
                setChecked(props.checked);
                count = 0;
            }
        }
    }, [props.checked]);

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
            console.log(labelData);
            count++;
            props.addIssueFunc(props.issueId);
            if (count == props.count) {
                props.func2(true);
            }
        }
        props.selectedFunc(count);
        setChecked(!checked);
    }

    const labelData = [];
    for(let i = 0; i < props.labelInfo.color.length; i++) {
        const data = {color: props.labelInfo.color[i], content: props.labelInfo.content[i]};
        labelData.push(data);
    }



    return (
        <StyledBannersListDiv>
            <StyledBannerCheckBoxDiv>
                <StyledBannerCheckBoxInput checked={checkedFunc()} onChange={setCheckFunc} />
            </StyledBannerCheckBoxDiv>

            <StyledBannerOpenClosedDiv>
                <StyledBannerOpenClosedIcon />
            </StyledBannerOpenClosedDiv>

            <StyledBannerTextDiv>
                <StyledBannerInnerDiv>
                    <StyledBannerTitle>{props.issueTitle}</StyledBannerTitle>
                    {labelData.map((element) => (
                        <StyledBannerLabel color={element.color}>
                            <p>{element.content}</p>
                        </StyledBannerLabel>
                    ))}
                </StyledBannerInnerDiv>
                <StyledBannerInfo>
                    #{props.issueId}{" "}{openOrClosed}{" "}{updatedTimeBefore} days ago by {props.userId}
                </StyledBannerInfo>
            </StyledBannerTextDiv>
        </StyledBannersListDiv>
    );
};

export default IssueTitle;
