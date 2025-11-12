import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const bodyToStore = (body) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
  };
};

export const responseFromStore = (store) => ({
  id: store.id,
  name: store.name,
  address: store.address,
  regionId: store.regionId,
  createdAt: dayjs(store.createdAt).tz("Asia/Seoul").toDate(),
  updatedAt: store.updatedAt
    ? dayjs(store.updatedAt).tz("Asia/Seoul").toDate()
    : null,
});
