import connection from "../db/connection";
import query from "../db/query";

const MilestoneService = {
    getMilestone: async (req, res) => {
        const [rows] = await connection.query(query.getMilestone);
        res.json(rows);
    },

    insertMilestone: async (req, res) => {
        const milestone = {
            title: req.body.title,
            dueDate: req.body.dueDate,
            description: req.body.description
        }

        const [rows] = await connection.query(query.insertMilestone,
            [milestone.title, milestone.dueDate, milestone.description, milestone.status]);

        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    updateMilestone: async (req, res) => {
        const milestone = {
            milestoneId: req.body.milestoneId,
            title: req.body.title,
            dueDate: req.body.dueDate,
            description: req.body.description,
            status: req.body.status
        }
        console.log(milestone);
        const [rows] = await connection.query(query.updateMilestone,
            [milestone.title, milestone.dueDate, milestone.description, milestone.status, milestone.milestoneId]);

        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    deleteMilestone: async (req, res) => {
        const milestoneId = req.body.milestoneId;

        const [rows] = await connection.query(query.deleteMilestone, [milestoneId]);

        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ message: "Error" });
        }
    }
}

export default MilestoneService
