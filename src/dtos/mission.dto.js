export const bodyToChallenge = (body) => ({
  missionId: body.missionId,
  userId: 1, // 특정 사용자로 가정
});

export const responseFromChallenge = (data) => ({
  id: data.id,
  missionId: data.mission_id,
  memberId: data.member_id,
  status: data.status,
  createdAt: data.created_at,
});
