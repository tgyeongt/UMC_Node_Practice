import { pool } from "../db.config.js";

export const getMemberMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await pool.query(
      `SELECT * FROM member_mission WHERE member_id = ? AND mission_id = ?;`,
      [userId, missionId]
    );
    return rows.length ? rows[0] : null;
  } finally {
    conn.release();
  }
};

export const insertMemberMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await pool.query(
      `INSERT INTO member_mission (member_id, mission_id, status, created_at)
       VALUES (?, ?, '도전중', NOW());`,
      [userId, missionId]
    );
    return {
      id: result.insertId,
      member_id: userId,
      mission_id: missionId,
      status: "도전중",
    };
  } catch (err) {
    throw new Error(`미션 도전 중 오류 발생 (${err})`);
  } finally {
    conn.release();
  }
};
