export const bodyToReview = (body) => ({
  storeId: body.storeId,
  body: body.body,
  score: body.score,
  userId: 1, // 특정 사용자로 가정
});

export const responseFromReview = (review) => ({
  id: review.id,
  storeId: review.store_id,
  body: review.body,
  score: review.score,
  createdAt: review.created_at,
});
