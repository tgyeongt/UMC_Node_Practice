import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const bodyToReview = (body) => ({
  storeId: body.storeId,
  body: body.body,
  score: body.score,
  userId: 1,
});

export const responseFromReview = (review) => ({
  id: review.id,
  storeId: review.storeId,
  userId: review.userId,
  body: review.body,
  score: review.score,
  ccreatedAt: dayjs(review.createdAt).tz("Asia/Seoul").toDate(),
  updatedAt: review.updatedAt
    ? dayjs(review.updatedAt).tz("Asia/Seoul").toDate()
    : null,
});
