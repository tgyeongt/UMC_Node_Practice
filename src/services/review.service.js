import {
  addReview,
  getAllStoreReviews,
} from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const addReviewService = async (data) => {
  const store = await getStoreById(data.storeId);
  if (!store) throw new Error("존재하지 않는 가게입니다.");

  const review = await addReview(data);
  return responseFromReview(review);
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReview(reviews);
};
