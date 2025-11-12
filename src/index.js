import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import {
  handleAddReview,
  handleListStoreReviews,
  handleListUserReviews,
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

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근

// request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.json());

// 단순 객체 문자열 형태로 본문 데이터 해석
app.use(express.urlencoded({ extended: false }));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
