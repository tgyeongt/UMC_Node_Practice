import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
  const created = await prisma.review.create({
    data: {
      storeId: data.storeId,
      userId: data.userId,
      body: data.body,
      score: data.score,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    include: {
      user: true,
      store: true,
      images: true,
    },
  });

  return created;
};

// 특정 가게의 리뷰 목록 (커서 기반 페이지네이션)
export const getAllStoreReviews = async (storeId, cursor = null, take = 5) => {
  const query = {
    where: { storeId: Number(storeId) },
    include: {
      user: true,
      store: true,
      images: true,
    },
    orderBy: { id: "asc" },
    take,
  };

  // 커서가 있을 경우 적용
  if (cursor) {
    query.cursor = { id: Number(cursor) };
    query.skip = 1; // 커서 중복 방지
  }

  const reviews = await prisma.review.findMany(query);
  return reviews;
};
