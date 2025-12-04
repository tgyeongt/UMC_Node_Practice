import bcrypt from "bcrypt";
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);

  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    age: data.age,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
    password: hashedPassword,
    status: data.status,
    socialType: data.socialType,
    inactiveDate: data.inactiveDate,
    point: data.point,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  });

  //  addUser() 함수 내부 로직에 따르면
  //  이미 존재하는 이메일이면 -> null 반환
  //  새로운 이메일이면 -> 새로 생성된 유저 ID 반환
  //  따라서 joinUserId === null일 때 "이미 존재하는 이메일입니다." 라는 메세지가 나온다
  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = (await getUserPreferencesByUserId(joinUserId)) ?? [];

  return responseFromUser({ user, preferences });
};
