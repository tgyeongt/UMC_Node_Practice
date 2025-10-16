import {
  getMemberMission,
  insertMemberMission,
} from "../repositories/mission.repository.js";
import { responseFromChallenge } from "../dtos/mission.dto.js";

export const challengeMissionService = async (data) => {
  const existing = await getMemberMission(data.userId, data.missionId);
  if (existing) throw new Error("이미 도전 중인 미션입니다.");

  const mission = await insertMemberMission(data.userId, data.missionId);
  return responseFromChallenge(mission);
};
