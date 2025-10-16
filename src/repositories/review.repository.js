import { pool } from "../db.config.js";

export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, [
      storeId,
    ]);
    return store.length ? store[0] : null;
  } finally {
    conn.release();
  }
};

export const addReview = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO review (store_id, member_id, body, score, created_at, updated_at)
       VALUES (?, ?, ?, ?, NOW(), NOW());`,
      [data.storeId, data.userId, data.body, data.score]
    );
    return { id: result.insertId, ...data };
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류 발생 (${err})`);
  } finally {
    conn.release();
  }
};
