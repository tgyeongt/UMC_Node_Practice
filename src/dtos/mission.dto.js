export const bodyToChallenge = (body) => ({
  missionId: body.missionId,
  userId: 1,
});

export const responseFromChallenge = (data) => ({
  id: data.id,
  missionId: data.mission_id,
  userId: data.user_id,
  status: data.status,
  createdAt: data.created_at,
});
