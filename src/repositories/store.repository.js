import { prisma } from "../db.config.js";

// id로 가게 단일 조회
export const getStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });
  return store;
};

// 가게 추가
export const addStore = async (data) => {
  const created = await prisma.store.create({
    data: {
      regionId: data.regionId,
      name: data.name,
      address: data.address,
    },
  });
  return created;
};
