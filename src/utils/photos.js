const BUILDING_PHOTOS = {
    H: "https://picsum.photos/seed/H/640/360",
    L: "https://picsum.photos/seed/L/640/360",
    B: "https://picsum.photos/seed/B/640/360",
  };
  export const getPhoto = (buildingId) =>
    BUILDING_PHOTOS[buildingId] || `https://picsum.photos/seed/${buildingId}/640/360`;
  