import { prisma } from "../db.config.js";

// 특정 유저가 특정 미션에 참여 중인지 확인
export const getUserMission = async (userId, missionId) => {
  const mission = await prisma.userMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
    },
  });
  return mission; // 없으면 null
};

// 유저가 미션 도전 시작
export const insertUserMission = async (userId, missionId) => {
  const created = await prisma.userMission.create({
    data: {
      userId: userId,
      missionId: missionId,
      status: "도전중",
    },
  });
  return created;
};

// 특정 가게의 모든 미션 목록
export const getMissionsByStore = async (storeId) => {
  return await prisma.mission.findMany({
    where: { storeId: Number(storeId) },
    orderBy: { id: "asc" },
  });
};

// 특정 유저의 모든 미션 목록
export const getUserMissions = async (userId, status) => {
  const where = { userId: Number(userId) };
  if (status) where.status = status;

  return await prisma.userMission.findMany({
    where,
    include: { mission: true },
    orderBy: { id: "asc" },
  });
};

// 미션 완료 처리
export const completeUserMission = async (missionId) => {
  return await prisma.userMission.update({
    where: { id: Number(missionId) },
    data: {
      status: "완료",
      completedAt: new Date(),
    },
  });
};
