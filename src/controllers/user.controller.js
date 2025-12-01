import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.tags = ['Users']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              detailAddress: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const { userData, preferenceIds } = bodyToUser(req.body); // 기존 DTO 사용
    if (!userData?.email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .error({ errorCode: "U001", reason: "email is required" });
    }
    const user = await createOrUpdateUser(userData, preferenceIds || []);
    return res.status(StatusCodes.OK).success(user);
  } catch (error) {
    next(error);
  }
};

// 나의 정보 수정
export const handleUpdateMyProfile = async (req, res, next) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .error({ errorCode: "AUTH001", reason: "Not authenticated" });
    }

    const { userData, preferenceIds } = bodyToUser(req.body); // reuse DTO
    const updated = await updateUserById(
      currentUserId,
      userData,
      preferenceIds || []
    );
    return res.status(StatusCodes.OK).success(updated);
  } catch (err) {
    next(err);
  }
};

// 내가 작성한 리뷰 목록
export const handleListUserReviews = async (req, res) => {
  /*
    #swagger.summary = '사용자가 작성한 리뷰 목록 조회 API';
    #swagger.tags = ['Users']
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: '조회할 사용자 ID',
      type: 'number'
    }

    #swagger.responses[200] = {
      description: "사용자 리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 20 },
                    content: { type: "string", example: "친절했고 맛도 괜찮았어요" },
                    score: { type: "number", example: 5 },
                    store: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 11 },
                        name: { type: "string", example: "홍길동식당" }
                      }
                    },
                    createdAt: { type: "string", example: "2025-01-10T18:30:00+09:00" }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    if (req.user && Number(req.user.id) !== Number(userId)) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "다른 사용자의 리뷰는 조회할 수 없습니다." });
    }

    const reviews = await prisma.review.findMany({
      where: { user_id: Number(userId) },
      include: { store: true },
      orderBy: { id: "desc" },
    });

    res.status(StatusCodes.OK).json({ reviews });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
