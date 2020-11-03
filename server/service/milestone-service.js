import pool from "../db/connection";
import query from "../db/query";

const MilestoneService = {
    getMilestone: async (req, res) => {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(query.getMilestone);
        res.json(rows);
    }
}

export default MilestoneService
