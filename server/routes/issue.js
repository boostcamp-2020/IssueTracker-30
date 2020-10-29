import express from "express";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.post("/getIssue", async(req, res) => {
    const userId = req.body.userId;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.getIssue, [userId]);
    console.log(rows);
    res.json(rows);
});

router.post("/insertIssue", async(req, res) => {
    const issue = {
        title: req.body.title,
        writingTime: req.body.writingTime,
        status: req.body.status,
        milestoneId: req.body.milestoneId,
        content: req.body.content,
        labelId: req.body.labelId
    };

    const connection = await pool.getConnection();
    const [rows1] = await connection.query(query.insertIssue, ["123123", issue.title, issue.writingTime, issue.status, issue.milestoneId, issue.content, issue.labelId]);

    if(issue.labelId != null) {
        const [rows2] = await connection.query(query.insertLabelIssueRelation, [rows1.insertId, issue.labelId]);
        if(rows2.affectedRows <= 0) {
            res.json({messages: "Error"});
        }
    }

    if(rows1.affectedRows > 0) {
        res.json({message: "success"});
    }
    else {
        res.json({messages: "Error"});
    }
});

router.put("/", async(req, res) => {
    const issue = {
        //userId 필요
        issueId: req.body.issueId,
        title: req.body.title,
        writingTime: req.body.writingTime,
        status: req.body.status,
        milestoneId: req.body.milestoneId,
        content: req.body.content
    };

    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.updateIssue, [issue.title, issue.writingTime, issue.status, issue.milestoneId, issue.content, issue.issueId]);
    if(rows.affectedRows > 0) {
        res.json({message: "success"});
    }
    else {
        res.json({messages: "Error"});
    }
});

export default router;
