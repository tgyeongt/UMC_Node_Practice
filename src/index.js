import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

import {
  handleUserSignUp,
  handleListUserReviews,
  handleUpdateMyProfile,
} from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import {
  handleAddReview,
  handleListStoreReviews,
} from "./controllers/review.controller.js";
import {
  handleChallengeMission,
  handleListStoreMissions,
  handleListUserMissions,
  handleCompleteMission,
} from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
passport.use(googleStrategy);
passport.use(jwtStrategy);

// ------------------- Swagger 설정 -------------------

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  try {
    const result = await swaggerAutogen(options)(outputFile, routes, doc);
    res.json(result ? result.data : null);
  } catch (err) {
    next(err);
  }
});

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(passport.initialize());

// ------------------- 공통 응답 헬퍼 -------------------

app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

// ------------------- 미들웨어 적용 -------------------

// 요청 로깅 (morgan)
app.use(morgan("dev"));

// 쿠키 처리 (cookie-parser)
app.use(cookieParser());

// CORS 허용
app.use(cors());

// 정적 파일 접근
app.use(express.static("public"));

// JSON, URL-encoded 요청 처리
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------- 소셜 로그인 -------------------

app.get(
  "/oauth2/login/google",
  passport.authenticate("google", {
    session: false,
  })
);
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    const tokens = req.user;

    res.status(200).json({
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "Google 로그인 성공!",
        tokens: tokens, // { "accessToken": "...", "refreshToken": "..." }
      },
    });
  }
);
const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req, res) => {
  res.status(200).success({
    message: `인증 성공! ${req.user.name}님의 마이페이지입니다.`,
    user: req.user,
  });
});

// ------------------- 라우팅 -------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* users */
// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 내 정보 수정
app.patch("/api/v1/users/me", isLogin, handleUpdateMyProfile);

// 내가 작성한 리뷰 목록
app.get("/api/v1/users/:userId/reviews", isLogin, handleListUserReviews);

// 내가 진행 중인 미션 목록
app.get("/api/v1/users/:userId/missions", isLogin, handleListUserMissions);

/* stores */
// 특정 지역에 가게 추가하기
app.post("/api/v1/stores", handleAddStore);

// 특정 가게에 리뷰 추가하기
app.post("/api/v1/stores/:storeId/reviews", isLogin, handleAddReview);

// 특정 가게 리뷰 조회하기
app.get("/api/v1/stores/:storeId/reviews", isLogin, handleListStoreReviews);

// 특정 가게의 미션 목록 조회하기
app.get("/api/v1/stores/:storeId/missions", isLogin, handleListStoreMissions);

/* missions */
// 미션 도전하기
app.post(
  "/api/v1/missions/:missionId/challenge",
  isLogin,
  handleChallengeMission
);

// 진행 중인 미션 완료 처리
app.patch(
  "/api/v1/missions/:missionId/complete",
  isLogin,
  handleCompleteMission
);

// ------------------- 전역 오류 핸들러 -------------------

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
