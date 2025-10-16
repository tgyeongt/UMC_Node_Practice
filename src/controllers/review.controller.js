import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { addReviewService } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 추가 요청이 들어왔습니다!");
  console.log("body:", req.body);

  try {
    const review = await addReviewService(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};
