import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const addStoreService = async (data) => {
  const store = await addStore(data);
  return responseFromStore(store);
};
