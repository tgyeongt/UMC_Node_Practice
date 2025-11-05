export const bodyToReview = (body) => ({
  storeId: body.storeId,
  body: body.body,
  score: body.score,
  userId: 1,
});

export const responseFromReview = (review) => ({
  id: review.id,
  storeId: review.store_id,
  userId: review.user_id,
  body: review.body,
  score: review.score,
  createdAt: review.created_at,
});
