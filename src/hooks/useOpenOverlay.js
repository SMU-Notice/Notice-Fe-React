// useOpenOverlay.js
import React, { useCallback, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { EventOverlay } from "../pages/Map/EventOverlay"; // default/export 형태 확인!

export function useOpenOverlay(mapRef) {
  const overlayRef = useRef(null);

  const openOverlay = useCallback((ev) => {
    const { kakao } = window || {};
    if (!kakao || !mapRef.current) return;

    if (!overlayRef.current) {
      overlayRef.current = new kakao.maps.CustomOverlay({ xAnchor: 0.5, yAnchor: 1.35, zIndex: 9999 });
    }

    // ✅ JSX 대신 createElement 사용
    const element = React.createElement(EventOverlay, { ev });
    const html = ReactDOMServer.renderToString(element);

    const container = document.createElement("div");
    container.innerHTML = html;

    ["click", "mousedown", "mouseup", "touchstart", "touchend"].forEach((evt) => {
      container.addEventListener(evt, (e) => e.stopPropagation(), true);
    });

    const pos = new kakao.maps.LatLng(ev.building.lat, ev.building.lng);
    overlayRef.current.setContent(container);
    overlayRef.current.setPosition(pos);
    overlayRef.current.setMap(mapRef.current);
  }, [mapRef]);

  const closeOverlay = useCallback(() => {
    overlayRef.current?.setMap(null);
  }, []);

  return { openOverlay, closeOverlay, overlayRef };
}
