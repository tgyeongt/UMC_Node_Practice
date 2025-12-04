import { prisma } from "../db.config.js";

// 유저 생성 (중복 이메일 방지)
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) return null;

  const created = await prisma.user.create({ data });
  return created.id;
};

// 유저 조회
export const getUser = async (userId) => {
  return await prisma.user.findFirstOrThrow({ where: { id: userId } });
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId },
    orderBy: { foodCategoryId: "asc" },
  });
  return preferences;
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
