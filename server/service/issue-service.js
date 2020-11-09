import connection from "../db/connection";
import query from "../db/query";

const IssueService = {
    getIssue: async (req, res) => {
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
        const { userId } = req.body;
        const issue = {
            title: req.body.title,
            writingTime: req.body.writingTime,
            status: req.body.status,
            milestoneId: req.body.milestoneId,
            content: req.body.content,
            labelId: req.body.labelId,
            assignId: req.body.assignId
        };

        const [rows1] = await connection.query(query.insertIssue, [userId, issue.title, issue.writingTime, issue.status, issue.milestoneId, issue.content]);

        issue.labelId.forEach(async v => {
            await connection.query(query.insertLabelIssueRelation, [rows1.insertId, v]);
        });

        issue.assignId.forEach(async v => {
            await connection.query(query.insertassignIssueRelation, [v, rows1.insertId]);
        });


        if (rows1.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    updateIssue: async (req, res) => {
        const issue = {
            mode: req.body.mode,
            issueId: req.body.issueId,
            title: req.body.title,
            status: req.body.status,
            milestoneId: req.body.milestoneId,
            content: req.body.content,
            labelId: req.body.labelId,
            assignId: req.body.assignId
        };

        try {
            switch (issue.mode) {
                case 1:
                    await connection.query(query.updateIssueTitle, [issue.title, issue.issueId]);
                    break;
                case 2:
                    await connection.query(query.updateIssueContent, [issue.content, issue.issueId]);
                    break;
                case 3:
                    await connection.query(query.updateIssueMilestone, [issue.milestoneId, issue.issueId]);
                    break;
                case 4:``
                    await connection.query(query.updateIssueStatus, [issue.status, issue.issueId]);
                    break;
                case 5:
                    await connection.query(query.deleteAssignIssueRelation, [issue.issueId]);
                    issue.assignId.forEach(async v => {
                        await connection.query(query.updateAssignIssueRelation, [v, issue.issueId]);
                    });
                    break;
                case 6:
                    await connection.query(query.deleteLabelIssueRelation, [issue.issueId]);
                    issue.labelId.forEach(async v => {
                        await connection.query(query.updateLabelIssueRelation, [issue.issueId, v]);
                    });
                    break;
                default:
                    break;
            }
            res.json({message: "success"});
        } catch (error) {
            res.json({message: "fail"});
        }
    }
}

export default IssueService;
