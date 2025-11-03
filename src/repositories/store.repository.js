import { pool } from "../db.config.js";

export const addStore = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO store (region_id, name, address, created_at)
       VALUES (?, ?, ?, NOW());`,
      [data.regionId, data.name, data.address]
    );
    return { id: result.insertId, ...data };
  } catch (err) {
    throw new Error(`가게 추가 중 오류 발생 (${err})`);
  } finally {
    conn.release();
  }
};

export const getStore = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT id, region_id, name, address, created_at
       FROM store
       WHERE id = ?;`,
      [storeId.id]
    );
    return rows[0];
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생 (${err})`);
  } finally {
    conn.release();
  }
};
