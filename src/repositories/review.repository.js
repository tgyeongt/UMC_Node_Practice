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
  const whereClause = {
    storeId: Number(storeId),
  };

  if (cursor) {
    whereClause.id = { gt: Number(cursor) };
  }

  const reviews = await prisma.review.findMany({
    where: whereClause,
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
      images: true,
    },
    orderBy: { id: "asc" },
    take,
  });

  return reviews;
};

// 내가 작성한 리뷰 목록
export const getReviewsByUser = async (userId) => {
  return await prisma.review.findMany({
    where: { userId: Number(userId) },
    include: {
      store: true,
    },
    orderBy: { id: "desc" },
  });
};
