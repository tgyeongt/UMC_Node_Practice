import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "./db.config.js";
import jwt from "jsonwebtoken";

dotenv.config();

const secret = process.env.JWT_SECRET;

// JWT 발급 함수

// 액세스 토큰 발급 (1시간 유효)
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, secret, {
    expiresIn: "1h",
  });
};

// 리프레시 토큰 발급 (14일 유효)
export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, secret, {
    expiresIn: "14d",
  });
};

// 구글 OAuth 인증 후 유저 처리
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error("구글 OAuth에서 이메일 정보를 찾을 수 없습니다.");
  }

  // DB에서 유저 찾기
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // 유저 존재 시 그대로 사용
  if (user) {
    return user;
  }

  // 신규 유저 생성
  user = await prisma.user.create({
    data: {
      email,
      name: profile.displayName ?? "이름 없음",
      gender: "추후 수정",
      birth: new Date(2003, 9, 16),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return user;
};

// Google OAuth

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/callback/google",

    scope: ["profile", "email"],
  },

  // 구글 인증 완료 후 실행되는 콜백
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);

      const jwtAccessToken = generateAccessToken(user);
      const jwtRefreshToken = generateRefreshToken(user);

      return cb(null, {
        accessToken: jwtAccessToken,
        refreshToken: jwtRefreshToken,
        user,
      });
    } catch (err) {
      return cb(err);
    }
  }
);

// JWT Strategy 설정 (Bearer 인증)

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

export const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (user) {
        return done(null, user);
      }

      // 유저 없을 시 인증 실패
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);
