import { useRef } from "react";

export function useKakaoLoader(appKey) {
  const loadedRef = useRef(false);

  const load = (cb) => {
    if (typeof window === "undefined") return;
    if (window.kakao?.maps) return window.kakao.maps.load(cb);

    // 중복 로드 방지
    if (loadedRef.current) return;
    loadedRef.current = true;

    let script = document.getElementById("kakao-map-script");
    if (!script) {
      script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);
    }
    script.onload = () => window.kakao.maps.load(cb);
  };

  return load;
}
