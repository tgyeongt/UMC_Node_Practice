export const ensureSelfOrAdmin = (req, res, next) => {
  const authUser = req.user;
  const paramUserId = req.params.userId ? Number(req.params.userId) : null;

  if (!authUser) {
    return res.status(401).json({ message: "인증이 필요합니다." });
  }

  // 만약 관리자인 로직이 있으면 authUser.role === 'admin' 추가
  if (paramUserId && Number(authUser.id) !== paramUserId) {
    // 현재는 본인만 허용
    return res.status(403).json({ message: "권한이 없습니다." });
  }

  next();
};
