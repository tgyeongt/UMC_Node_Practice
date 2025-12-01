import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import {
  handleUserSignUp,
  handleListUserReviews,
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

// ------------------- 라우팅 -------------------

app.get("/", (req, res) => {
  res.send("Hello World!");
});

/* users */
// 회원가입
app.post("/api/v1/users/signup", handleUserSignUp);

// 내가 작성한 리뷰 목록
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);

// 내가 진행 중인 미션 목록
app.get("/api/v1/users/:userId/missions", handleListUserMissions);

/* stores */
// 특정 지역에 가게 추가하기
app.post("/api/v1/stores", handleAddStore);

// 특정 가게에 리뷰 추가하기
app.post("/api/v1/stores/:storeId/reviews", handleAddReview);

// 특정 가게 리뷰 조회하기
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 특정 가게의 미션 목록 조회하기
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

/* missions */
// 미션 도전하기
app.post("/api/v1/missions/:missionId/challenge", handleChallengeMission);

// 진행 중인 미션 완료 처리
app.patch("/api/v1/missions/:missionId/complete", handleCompleteMission);

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
