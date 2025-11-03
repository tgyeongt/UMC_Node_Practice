export const bodyToStore = (body) => {
  return {
    regionId: body.regionId,
    name: body.name,
    address: body.address,
  };
};

export const responseFromStore = (store) => ({
  id: store.id,
  name: store.name,
  address: store.address,
  regionId: store.region_id,
  createdAt: store.created_at,
});
