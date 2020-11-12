import React, { useState } from "react";
import axios from "axios";

import host from "../../config.js";
import NewIssueForm from "./new-issue-form.jsx";
import IssueOption from "./issue-option.jsx";


const getDateTime = () => {
    const year = (new Date().getFullYear()).toString().padStart(2, 0)
    const month = (new Date().getMonth() + 1).toString().padStart(2, 0)
    const date = (new Date().getDate()).toString().padStart(2, 0)
    const hours = (new Date().getHours()).toString().padStart(2, 0)
    const minutes = (new Date().getMinutes()).toString().padStart(2, 0)
    const seconds = (new Date().getSeconds()).toString().padStart(2, 0)

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

const newIssue = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [assignee, setAssignee] = useState(new Set());
    const [label, setLabel] = useState(new Set());
    const [labelId, setLabelId] = useState(new Set());
    const [milestone, setMilestone] = useState('');

    const submit = () => {
        if (title.length < 1) return;
        if (confirm("이슈를 등록하시겠습니까?")) {
            const filteredLabelId = [];

            labelId.forEach(element => {
                filteredLabelId.push(Number(element.split('_')[1]))
            });

            const writingTime = getDateTime();

            const milestoneId = Number(milestone.id);

            const data = {
                title,
                writingTime,
                status: 1,
                milestoneId,
                content,
                labelId: filteredLabelId,
                assignId: assignee
            };
            console.log(data)
            axios({
                method: "POST",
                url: `http://${host}:3000/issue`,
                data,
                withCredentials: true,
            }).then((res) => {
                if (res.data.message === "success") {
                    alert("이슈를 등록하였습니다!");
                    const issueData = JSON.parse(localStorage.getItem("issueData"));

                    const labelData = JSON.parse(localStorage.getItem("labelsData"));

                    const milestoneData = JSON.parse(localStorage.getItem("milestonesData"))

                    const labelColor = [];
                    const labelContent = [];

                    filteredLabelId.forEach(element => {
                        labelData.forEach(label => {
                            if (element === Number(label.ID)) {
                                labelColor.push(label.color)
                                labelContent.push(label.content)
                            }
                        });
                    });

                    let milestoneTitle;

                    milestoneData.forEach(element => {
                        console.log(element)
                        if (Number(element.ID) === milestoneId) {
                            milestoneTitle = element.title
                        }
                    });

                    issueData.push({
                        assignId: Array.from(assignee),
                        content,
                        issueId: res.data.issueId,
                        title,
                        labelColor,
                        labelContent,
                        labelId: filteredLabelId,
                        milestoneId,
                        milestoneTitle,
                        status: 1,
                        userId: localStorage.getItem('userId'),
                        writingTime,
                    })

                    localStorage.setItem("issueData", JSON.stringify(issueData))

                    window.location.href = `http://${host}:3030/detail/${res.data.issueId}`
                }
            });
        }
    }
    return (
        <>
            <NewIssueForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                submit={submit}
            />
            <IssueOption
                assignee={assignee}
                setAssignee={setAssignee}
                label={label}
                setLabel={setLabel}
                labelId={labelId}
                setLabelId={setLabelId}
                milestone={milestone}
                setMilestone={setMilestone}
            />
        </>
    );
};

export default newIssue;
