import {
  getMissionsByStore,
  getUserMissions,
  completeUserMission,
  insertUserMission,
} from "../repositories/mission.repository.js";

// 특정 가게의 미션 목록 조회
export const listStoreMissions = async (storeId) => {
  return await getMissionsByStore(storeId);
};

// 특정 유저의 미션 목록 조회
export const listUserMissions = async (userId, status) => {
  return await getUserMissions(userId, status);
};

// 미션 완료 처리
export const completeMissionService = async (missionId) => {
  const updated = await completeUserMission(missionId);
  return updated;
};

export const challengeMissionService = async (userId, missionId) => {
  // 이미 도전 중인지 확인
  const existing = await prisma.user_mission.findFirst({
    where: { user_id: userId, mission_id: missionId },
  });

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 새로운 미션 도전 생성
  const mission = await insertUserMission(userId, missionId);
  return mission;
};
