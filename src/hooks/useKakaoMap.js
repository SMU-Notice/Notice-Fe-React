import { useEffect, useRef } from "react";

export function useKakaoMap(loadKakao, mapDivRef, initialCenter, initialLevel = 3) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return;

    loadKakao(() => {
      const { kakao } = window;
      const map = new kakao.maps.Map(
        mapDivRef.current,
        { center: new kakao.maps.LatLng(initialCenter.lat, initialCenter.lng), level: initialLevel }
      );
      const zoom = new kakao.maps.ZoomControl();
      map.addControl(zoom, kakao.maps.ControlPosition.RIGHT);
      mapRef.current = map;
    });
  }, [loadKakao, mapDivRef, initialCenter, initialLevel]);

  return mapRef; // .current가 kakao.maps.Map
}
