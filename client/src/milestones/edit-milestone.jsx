import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import HeaderOne from "../components/label-milestone-header.jsx";
import NewMilestoneForm from "./milestone-form.jsx";

const StyledHeaderButtonLabel = HeaderOne("Label", 0);
const StyledHeaderButtonMiles = HeaderOne("Milestones", 1);

const StyledCreateMilestoneButton = styled.button`
    float: right;
    cursor: pointer;
    outline: none;
    background: linear-gradient(rgba(51,205,86,1) 0%, rgba(41,171,71,1) 100%);
`;

const EditMilestones = (props) => {
    return (
        <>
        edit
            <div style={{ display: "flex", flexDirection: "column" }}>
                <NewMilestoneForm></NewMilestoneForm>
                <div>
                    <hr></hr>
                    <StyledCreateMilestoneButton>Create milestone</StyledCreateMilestoneButton>
                </div>
            </div>
        </>
    );

}


export default EditMilestones;
