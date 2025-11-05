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
  await prisma.user_favor_category.create({
    data: {
      user_id: userId,
      food_category_id: foodCategoryId,
    },
  });
};

// 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.user_favor_category.findMany({
    select: {
      id: true,
      user_id: true,
      food_category_id: true,
      food_category: true,
    },
    where: { user_id: userId },
    orderBy: { food_category_id: "asc" },
  });
  return preferences;
};
