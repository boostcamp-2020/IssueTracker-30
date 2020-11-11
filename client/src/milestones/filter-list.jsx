import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ListInfoBar from "./milestones-list-info-bar.jsx";
import FilteredList from "./milestones-filter-result.jsx";

const StyledList = styled.div`
  width: 900px;
  min-height: 300px;

  margin-top: 20px;

  border: 0;
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgb(36, 41, 46);

  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-weight: 400;
  font-size: 12px;
`;

const FilterList = () => {
    const milestonesData = JSON.parse(localStorage.getItem("milestonesData"));
    const milestonesOpenData = [];
    const milestonesCloseData = [];

    if(milestonesData) {
        milestonesData.forEach(element => {
            if(element.status === 1) {
                milestonesOpenData.push(element);
            }
            else if(element.status === 0) {
                milestonesCloseData.push(element);
            }
        });
    }

    const numOfOpenMilestone = milestonesOpenData.length;
    const numOfCloseMilestone = milestonesCloseData.length;
    const [curStatus, setCurStatus] = useState("Open");
    const [curCount, setCurCount] = useState(numOfOpenMilestone);
    let curData = curStatus === "Open" ? milestonesOpenData : milestonesCloseData;

    useEffect(() => {
        curStatus === "Open" ? setCurCount(numOfOpenMilestone) : setCurCount(numOfCloseMilestone);
        curData = curStatus === "Open" ? milestonesOpenData : milestonesCloseData;
        console.log("eee");
    }, [curStatus]);

    return (
        <StyledList>
            <ListInfoBar
                setCurStatus={setCurStatus}
                numOfOpenMilestone={numOfOpenMilestone}
                numOfCloseMilestone={numOfCloseMilestone}>
            </ListInfoBar>
            <FilteredList
                numOfMilestone={curCount}
                milestonesData={curData}>
            </FilteredList>
        </StyledList>
    );
};

export default FilterList;
