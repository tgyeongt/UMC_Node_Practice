import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address, created_by, created_at)
       VALUES (?, ?, ?, ?, NOW());`,
      [data.regionId, data.name, data.address, data.userId]
    );
    return { id: result.insertId, ...data };
  } catch (err) {
    throw new Error(`가게 추가 중 오류 발생 (${err})`);
  } finally {
    conn.release();
  }
};
