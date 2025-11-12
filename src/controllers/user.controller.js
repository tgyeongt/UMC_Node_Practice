import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  try {
    const user = await userSignUp(req.body);
    res.status(201).json({ result: user });
  } catch (error) {
    next(error);
  }
};
