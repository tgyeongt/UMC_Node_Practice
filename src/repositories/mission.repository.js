import { prisma } from "../db.config.js";

// 특정 유저가 특정 미션에 참여 중인지 확인
export const getUserMission = async (userId, missionId) => {
  const mission = await prisma.user_mission.findFirst({
    where: {
      user_id: userId,
      mission_id: missionId,
    },
  });
  return mission; // 없으면 null
};

// 유저가 미션 도전 시작
export const insertUserMission = async (userId, missionId) => {
  const created = await prisma.user_mission.create({
    data: {
      user_id: userId,
      mission_id: missionId,
      status: "도전중",
    },
  });
  return created;
};
