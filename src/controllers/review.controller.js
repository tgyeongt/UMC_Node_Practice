import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import {
  addReviewService,
  listStoreReviews,
} from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  console.log("리뷰 추가 요청이 들어왔습니다!");
  console.log("body:", req.body);
  console.log("params:", req.params); // storeId가 들어있는지 확인

  try {
    const reviewData = {
      ...bodyToReview(req.body),
      storeId: Number(req.params.storeId),
    };

    const review = await addReviewService(reviewData);

    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
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
