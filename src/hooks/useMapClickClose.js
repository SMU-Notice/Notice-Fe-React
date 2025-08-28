import { useEffect } from "react";

export function useMapClickClose(mapRef, onClose) {
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.kakao) return;

    const { kakao } = window;
    const handler = () => onClose?.();

    kakao.maps.event.addListener(map, "click", handler);
    return () => kakao.maps.event.removeListener(map, "click", handler);
  }, [mapRef, onClose]);
}
