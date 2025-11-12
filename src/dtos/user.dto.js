import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const bodyToUser = (body) => {
  const birth = dayjs(body.birth).tz("Asia/Seoul").toDate();

  const userData = {
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    password: body.password,
  };

  const preferenceIds = Array.isArray(body.preferences)
    ? body.preferences.map(Number)
    : [];

  return { userData, preferenceIds };
};

export const responseFromUser = ({ user, userFavorCategories }) => {
  const preferFoods = userFavorCategories.map((ufc) => ufc.foodCategory.name);

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
    createdAt: dayjs(user.createdAt).tz("Asia/Seoul").toDate(),
    updatedAt: dayjs(user.updatedAt).tz("Asia/Seoul").toDate(),
  };
};
