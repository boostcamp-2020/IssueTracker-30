import connection from "../db/connection";
import query from "../db/query";

const LabelService = {
    getLabel: async (req, res) => {
        const [rows] = await connection.query(query.getLabel);
        res.json(rows);
    },

    insertLabel: async (req, res) => {
        const label = {
            content: req.body.content,
            color: req.body.color,
            description: req.body.description
        }

        const [rows] = await connection.query(query.insertLabel, [label.content, label.color, label.description]);
        
        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    updateLabel: async (req, res) => {
        const label = {
            labelId: req.body.labelId,
            content: req.body.content,
            color: req.body.color,
            description: req.body.description
        }

        const [rows] = await connection.query(query.updateLabel, [label.content, label.color, label.description, label.labelId]);
        
        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    },

    deleteLabel: async (req, res) => {
        const labelId = req.body.labelId;

        const [rows] = await connection.query(query.deleteLabel, [labelId]);

        if (rows.affectedRows > 0) {
            res.json({ message: "success" });
        }
        else {
            res.json({ messages: "Error" });
        }
    }


}

export default LabelService;
