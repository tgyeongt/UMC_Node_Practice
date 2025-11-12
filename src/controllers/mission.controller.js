import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/mission.dto.js";
import {
  listStoreMissions,
  listUserMissions,
  challengeMissionService,
  completeMissionService,
} from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전 요청이 들어왔습니다!");
  console.log("body:", req.body);

  try {
    const mission = await challengeMissionService(bodyToChallenge(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// 특정 가게의 미션 목록
export const handleListStoreMissions = async (req, res) => {
  try {
    const { storeId } = req.params;
    const missions = await listStoreMissions(storeId);
    res.status(StatusCodes.OK).json({ missions });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// 특정 유저의 미션 목록 (status: 도전중 / 완료)
export const handleListUserMissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query; // ?status=도전중 같은 식으로 필터링
    const missions = await listUserMissions(userId, status);
    res.status(StatusCodes.OK).json({ missions });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// 미션 완료 처리
export const handleCompleteMission = async (req, res) => {
  try {
    const { missionId } = req.params;
    const result = await completeMissionService(missionId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
