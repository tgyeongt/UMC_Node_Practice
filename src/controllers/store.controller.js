import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
  console.log("가게 추가 요청이 들어왔습니다!");
  console.log("body:", req.body);

  try {
    const store = await addStoreService(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
