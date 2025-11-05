import {
  getUserMission,
  insertUserMission,
} from "../repositories/mission.repository.js";
import { responseFromChallenge } from "../dtos/mission.dto.js";

export const challengeMissionService = async (data) => {
  const existing = await getUserMission(data.userId, data.missionId);
  if (existing) throw new Error("이미 도전 중인 미션입니다.");

  const mission = await insertUserMission(data.userId, data.missionId);
  return responseFromChallenge(mission);
};
