import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const bodyToChallenge = (body) => ({
  missionId: body.missionId,
  userId: 1,
  status: "in_progress",
});

export const responseFromChallenge = (data) => ({
  id: data.id,
  missionId: data.missionId,
  userId: data.userId,
  status: data.status,
  completedAt: data.completedAt
    ? dayjs(data.completedAt).tz("Asia/Seoul").toDate()
    : null,
  createdAt: dayjs(data.createdAt).tz("Asia/Seoul").toDate(),
});
