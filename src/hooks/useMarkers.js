import { useEffect, useRef } from "react";
import { createMarkerElement } from "../utils/dom";

export function useMarkers(mapRef, eventsWithBuilding, { onMarkerClick, setHover }) {
  const markerMapRef = useRef(new Map()); // eventId -> overlay

  useEffect(() => {
    const map = mapRef.current;
    const { kakao } = window || {};
    if (!map || !kakao) return;

    // cleanup 이전 것들
    markerMapRef.current.forEach((ov) => ov.setMap(null));
    markerMapRef.current.clear();

    const bounds = new kakao.maps.LatLngBounds();

    eventsWithBuilding.forEach((ev) => {
      const pos = new kakao.maps.LatLng(ev.building.lat, ev.building.lng);
      const el = createMarkerElement(ev.building?.id ?? "?", ev.id);

      const ov = new kakao.maps.CustomOverlay({
        position: pos,
        xAnchor: 0.3,
        yAnchor: 1.1,
        clickable: true,
        content: el,
      });

      ov.setMap(map);
      markerMapRef.current.set(ev.id, ov);
      bounds.extend(pos);

      el.addEventListener("mouseenter", () => setHover?.(ev.buildingId));
      el.addEventListener("mouseleave", () => setHover?.(null));
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onMarkerClick?.(ev, pos);
      });
    });

    if (eventsWithBuilding.length > 1) {
      map.setBounds(bounds, 20, 20, 20, 20);
    } else if (eventsWithBuilding.length === 1) {
      map.setCenter(bounds.getSouthWest());
      map.setLevel(3);
    }

    return () => {
      markerMapRef.current.forEach((ov) => ov.setMap(null));
      markerMapRef.current.clear();
    };
  }, [mapRef, eventsWithBuilding, onMarkerClick, setHover]);

  return markerMapRef; // eventId -> overlay
}
