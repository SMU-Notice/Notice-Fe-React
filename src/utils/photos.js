import H1 from "../assets/H1.jpg"


const BUILDING_PHOTOS = {
    H: H1,
    L: "https://picsum.photos/seed/L/640/360",
    B: "https://picsum.photos/seed/B/640/360",
  };
  export const getPhoto = (buildingId) =>
    BUILDING_PHOTOS[buildingId] || `https://picsum.photos/seed/${buildingId}/640/360`;
  