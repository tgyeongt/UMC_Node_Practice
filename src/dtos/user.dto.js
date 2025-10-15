export const bodyToUser = (body) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택
    detailAddress: body.detailAddress || "", //선택
    phoneNumber: body.phoneNumber, //필수
    preferences: body.preferences, // 필수
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const userInfo = Array.isArray(user) ? user[0] : user;

  return {
    id: userInfo.id,
    email: userInfo.email,
    name: userInfo.name,
    gender: userInfo.gender,
    birth: userInfo.birth,
    address: userInfo.address,
    detailAddress: userInfo.detail_address,
    phoneNumber: userInfo.phone_number,
    createdAt: userInfo.created_at,
    updatedAt: userInfo.updated_at,
    preferences: preferences.map((pref) => ({
      id: pref.id,
      categoryId: pref.food_category_id,
      categoryName: pref.name,
    })),
  };
};
