export const bodyToStore = (body) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
    // 특정 사용자로 가정 (ex. DB에 저장된 첫 번째 사용자)
    userId: 1,
  };
};

export const responseFromStore = (store) => ({
  id: store.id,
  name: store.name,
  address: store.address,
  regionId: store.region_id,
  createdAt: store.created_at,
});
