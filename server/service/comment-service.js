import connection from "../db/connection";
import query from "../db/query";

const IssueService = {
    getComment: async (req, res) => {
        const issueId = req.body.issueId;
        const [rows] = await connection.query(query.getComment, [issueId]);
        res.json(rows);
    },

    insertComment: async (req, res) => {
        const userId = req.body.userId;
        const comment = {
            issueId: req.body.issueId,
            writingTime: req.body.writingTime,
            comment: req.body.comment
        };
        const [rows1] = await connection.query(query.insertComment, [userId, comment.writingTime, comment.comment]);
        const [rows2] = await connection.query(query.insertIssueCommentRelation, [comment.issueId, rows1.insertId]);

        if (rows1.affectedRows > 0 && rows2.affectedRows > 0) {
            res.json({ message: "success" });
        }

        else {
            res.json({ messages: "Error" });
        }
    },

    updateComment: async (req, res) => {
        const comment = {
            ID: req.body.ID,
            comment: req.body.comment,
            writingTime: req.body.writingTime,
        };

        const [rows] = await connection.query(query.updateComment, [comment.comment, comment.writingTime, comment.ID]);
        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    deleteComment: async (req, res) => {
        const ID = req.body.ID;
        const [rows] = await connection.query(query.deleteComment, [ID]);

        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
    }
}

export default IssueService