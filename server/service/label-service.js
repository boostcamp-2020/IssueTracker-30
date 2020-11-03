import pool from "../db/connection";
import query from "../db/query";

const LabelService = {
  getLabel : async(req, res) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(query.getLabel);
    res.json(rows);
  }
}

export default LabelService;
