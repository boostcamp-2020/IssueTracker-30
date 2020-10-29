import express from "express";
import pool from "../db/connection";
import query from "../db/query";

const router = express.Router();

router.post("/getComment", async (req, res) => {
    const issueId = req.body.issueId;

    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.getContent, [issueId]);
    console.log(rows);
    res.json(rows);
});

router.post("/insertcomment", async (req, res) => {
    const comment = {
        issueId: req.body.issueId,
        writingTime: req.body.writingTime,
        comment: req.body.comment
    };

    if (comment.issueId != null && comment.writingTime != null && comment.comment != null) {
        const connection = await pool.getConnection();
        const [rows1] = await connection.query(query.insertComment, [comment.writingTime, comment.comment]);
        const [rows2] = await connection.query(query.insertIssueCommentRelation, [comment.issueId, rows1.insertId]);
        if (rows1.affectedRows > 0 && rows2.affectedRows > 0) {
            res.json({ message: "success" });
        }
    }
    
    res.json({ messages: "Error" });
});

router.put("/", async (req, res) => {

});

router.delete("/", async (req, res) => {

});

export default router;



