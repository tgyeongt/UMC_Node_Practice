import { responseFromStore } from "../dtos/store.dto.js";
import { addStore, getStoreById } from "../repositories/store.repository.js";

export const addStoreService = async (data) => {
  const createdStore = await addStore(data);

  if (!createdStore?.id) {
    throw new Error("가게 생성 실패");
  }

  const store = await getStoreById(createdStore);
  console.log("store from getStore:", store);

  return responseFromStore(store);
};
