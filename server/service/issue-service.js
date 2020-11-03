import pool from "../db/connection";
import query from "../db/query";

const IssueService = {
    getIssue: async (req, res) => {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query.getIssue);
        const [labelIssue] = await connection.query(query.getlabelIssue);
        const [assignIssue] = await connection.query(query.getassignIssue);

        rows.forEach((v, i) => {
            v.labelId = [];
            v.labelContent = [];
            v.labelColor = [];
            v.assignId = [];
            labelIssue.filter((e) => {
                return e.issueId == v.issueId;
            }).forEach((k, i) => {
                v.labelId.push(k.labelId);
                v.labelContent.push(k.content);
                v.labelColor.push(k.color);
            });
            assignIssue.filter((e) => {
                return e.issueId == v.issueId;
            }).forEach((k, i) => {
                v.assignId.push(k.assignId);
            });
        });

        res.json(rows);
    },

    insertIssue: async (req, res) => {
        const userId = req.body.userId;
        const issue = {
            title: req.body.title,
            writingTime: req.body.writingTime,
            status: req.body.status,
            milestoneId: req.body.milestoneId,
            content: req.body.content,
            labelId: req.body.labelId
        };

        const connection = await pool.getConnection();
        const [rows1] = await connection.query(query.insertIssue, [userId, issue.title, issue.writingTime, issue.status, issue.milestoneId, issue.content, issue.labelId]);

        if (issue.labelId != null) {
            const [rows2] = await connection.query(query.insertLabelIssueRelation, [rows1.insertId, issue.labelId]);
            if (rows2.affectedRows <= 0) {
                res.json({ messages: "Error" });
            }
        }

        if (rows1.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    updateIssue : async(req, res) => {
        const userId = req.body.userId;
        const issue = {
            issueId: req.body.issueId,
            title: req.body.title,
            writingTime: req.body.writingTime,
            status: req.body.status,
            milestoneId: req.body.milestoneId,
            content: req.body.content
        };
    
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query.updateIssue, [userId, issue.title, issue.writingTime, issue.status, issue.milestoneId, issue.content, issue.issueId]);
        if(rows.affectedRows > 0) {
            res.json({message: "success"});
        }
        else {
            res.json({messages: "Error"});
        }
    }
}

export default IssueService;
