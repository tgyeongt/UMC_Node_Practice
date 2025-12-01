import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게 추가 API'
    #swagger.tags = ['Stores']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "홍길동식당" },
              address: { type: "string", example: "서울 강남구 테헤란로 123" },
              category: { type: "string", example: "한식" }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "가게 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              result: {
                type: "object",
                properties: {
                  id: { type: "number", example: 15 },
                  name: { type: "string", example: "홍길동식당" },
                  address: { type: "string", example: "서울 강남구 테헤란로 123" },
                  category: { type: "string", example: "한식" }
                }
              }
            }
          }
        }
      }
    }
  */

  try {
    const store = await addStoreService(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
