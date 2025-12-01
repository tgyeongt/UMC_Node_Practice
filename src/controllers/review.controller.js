import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReviewService,
  listStoreReviews,
} from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 추가 API';
    #swagger.tags = ['Stores']
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '리뷰를 작성할 상점 ID',
      type: 'number'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              content: { type: "string", example: "정말 맛있는 가게예요!" },
              score: { type: "number", example: 5 }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "리뷰 생성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  id: { type: "number", example: 12 },
                  storeId: { type: "number", example: 3 },
                  userId: { type: "number", example: 7 },
                  content: { type: "string", example: "정말 맛있어요!" },
                  score: { type: "number", example: 5 }
                }
              }
            }
          }
        }
      }
    }
  */
  try {
    const reviewData = {
      ...bodyToReview(req.body),
      storeId: Number(req.params.storeId),
      userId: req.user.id,
    };

    const review = await addReviewService(reviewData);

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.tags = ['Stores']
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const storeId = Number(req.params.storeId);
    const reviews = await listStoreReviews(storeId);
    res.status(StatusCodes.OK).json({ reviews });
  } catch (err) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
