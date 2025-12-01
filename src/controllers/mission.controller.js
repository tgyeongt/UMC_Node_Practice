import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/mission.dto.js";
import {
  listStoreMissions,
  listUserMissions,
  challengeMissionService,
  completeMissionService,
} from "../services/mission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전하기 API'
    #swagger.tags = ['Missions']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number", example: 7 },
              missionId: { type: "number", example: 3 }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "미션 도전 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  id: { type: "number", example: 11 },
                  missionId: { type: "number", example: 3 },
                  userId: { type: "number", example: 7 },
                  status: { type: "string", example: "도전중" },
                  startedAt: { type: "string", example: "2025-01-10T12:00:00+09:00" }
                }
              }
            }
          }
        }
      }
    }
  */

  try {
    const mission = await challengeMissionService(bodyToChallenge(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

// 특정 가게의 미션 목록
export const handleListStoreMissions = async (req, res) => {
  /*
    #swagger.summary = '특정 가게의 미션 목록 조회 API'
    #swagger.tags = ['Missions']
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '상점 ID',
      type: 'number',
      example: 3
    }

    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 4 },
                    storeId: { type: "number", example: 3 },
                    title: { type: "string", example: "음식 사진 인증하기" },
                    reward: { type: "string", example: "100포인트" },
                    description: { type: "string", example: "사진 업로드 시 포인트 지급" }
                  }
                }
              }
            }
          }
        }
      }
    }
  */
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
  /*
    #swagger.summary = '사용자의 미션 목록 조회 API'
    #swagger.tags = ['Missions']
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: '유저 ID',
      type: 'number',
      example: 7
    }
    #swagger.parameters['status'] = {
      in: 'query',
      required: false,
      description: '미션 상태 필터 (도전중 | 완료)',
      type: 'string',
      example: '도전중'
    }

    #swagger.responses[200] = {
      description: "사용자 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 12 },
                    missionId: { type: "number", example: 3 },
                    userId: { type: "number", example: 7 },
                    status: { type: "string", example: "도전중" },
                    startedAt: { type: "string", example: "2025-01-11T13:00:00+09:00" },
                    completedAt: { type: "string", example: null }
                  }
                }
              }
            }
          }
        }
      }
    }
  */
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
  /*
    #swagger.summary = '미션 완료 처리 API'
    #swagger.tags = ['Missions']
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      type: 'number',
      example: 3,
      description: '완료 처리할 missionId'
    }

    #swagger.responses[200] = {
      description: "미션 완료 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  missionId: { type: "number", example: 3 },
                  status: { type: "string", example: "완료" },
                  completedAt: { type: "string", example: "2025-01-15T14:00:00+09:00" }
                }
              }
            }
          }
        }
      }
    }
  */
  try {
    const { missionId } = req.params;
    const result = await completeMissionService(missionId);
    res.status(StatusCodes.OK).json({ result });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
