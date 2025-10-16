import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/mission.dto.js";
import { challengeMissionService } from "../services/mission.service.js";

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
