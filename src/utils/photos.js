import A from "../assets/map/A.jpg";
import B from "../assets/map/B.jpg";
import C from "../assets/map/C.jpg";
import D from "../assets/map/D.jpg";
import E from "../assets/map/E.jpg";
import F from "../assets/map/F.jpg";
import G from "../assets/map/G.jpg";
import H from "../assets/map/H.jpg";
import I from "../assets/map/I.jpg";
import J from "../assets/map/J.jpg";
import L from "../assets/map/L.jpg";
import M from "../assets/map/M.jpg";
import N from "../assets/map/N.jpg";
import O from "../assets/map/O.jpg";
import R from "../assets/map/R.jpg";
import S from "../assets/map/S.jpg";
import T from "../assets/map/T.jpg";
import U from "../assets/map/U.jpg";

const BUILDING_PHOTOS = {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  L,
  M,
  N,
  O,
  R,
  S,
  T,
  U,
};

export const getPhoto = (buildingId) =>
  BUILDING_PHOTOS[buildingId] || `https://picsum.photos/seed/${buildingId}/640/360`;
