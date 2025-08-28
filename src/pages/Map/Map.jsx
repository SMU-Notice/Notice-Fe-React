import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import {
  Wrapper,
  Sidebar,
  MapContainer,
  Item,
  TitleRow,
  Badge,
  TitleText,
  Expanded,
  Photo,
  ExpandedTitle,
  Dates,
  OverlayCalendarIcon,
  OverlayBookMarkIcon,
  OverlayPlace
} from "./MapStyle";
import { useKakaoLoader } from "../../hooks/useKakaoLoader";
import { useKakaoMap } from "../../hooks/useKakaoMap";
import { useMapClickClose } from "../../hooks/useMapClickClose";
import { useOpenOverlay } from "../../hooks/useOpenOverlay";
import { useMarkers } from "../../hooks/useMarkers";
import { mapLocationToBuildingId } from "../../utils/mapping";
import { getPhoto } from "../../utils/photos";
import calendarIcon from "../../assets/calendar.svg";
import axios from "axios";

const BUILDINGS = {
  A: { id: "A", name: "사범대학관", lat: 37.60244721078027, lng: 126.95469086896858 },
  B: { id: "B", name: "미술관", lat: 37.60294311884513, lng: 126.95564749067206 },
  C: { id: "C", name: "가정관", lat: 37.603240562196845, lng: 126.95595873979431 },
  D: { id: "D", name: "생활예술관", lat: 37.60355140376112, lng: 126.95595855654332 },
  E: { id: "E", name: "학군단", lat: 37.60340282050334, lng: 126.95617381146123 },
  F: { id: "F", name: "체육관", lat: 37.60386184326187, lng: 126.95489385496892 },
  G: { id: "G", name: "제1공학관", lat: 37.60158665389276, lng: 126.95440262069417 },
  H: { id: "H", name: "학생회관", lat: 37.60199211700528, lng: 126.95444767075735 },
  I: { id: "I", name: "제2교수회관", lat: 37.60389157811703, lng: 126.95609425203689 },
  J: { id: "J", name: "대학본부", lat: 37.6024627835681, lng: 126.9541869213483 },
  K: { id: "K", name: "제2공학관", lat: 37.600722712577365, lng: 126.95709547406176 },
  L: { id: "L", name: "학술정보관", lat: 37.602217704322996, lng: 126.95533649988599 },
  M: { id: "M", name: "월해관", lat: 37.60377908653953, lng: 126.95645104472041 },
  N: { id: "N", name: "자하관", lat: 37.60104832528454, lng: 126.95443692195983 },
  O: { id: "O", name: "제1교수회관", lat: 37.600827567329205, lng: 126.95439742186889 },
  R: { id: "R", name: "미래백년관", lat: 37.60302621608477, lng: 126.9550019426249 },
  S: { id: "S", name: "중앙교수회관", lat: 37.601282685215864, lng: 126.95470289948575 },
  T: { id: "T", name: "경영경제대학관", lat: 37.60222015278364, lng: 126.95585742158832 },
  U: { id: "U", name: "문화예술관", lat: 37.603155190587444, lng: 126.9565589917192 },
};

const MapWithEvents = () => {
  const mapDivRef = useRef(null);

  // 상태
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [hoverBuildingId, setHoverBuildingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Kakao 로더 & 지도
  const loadKakao = useKakaoLoader(import.meta.env.VITE_KAKAO_KEY);
  const mapRef = useKakaoMap(loadKakao, mapDivRef, { lat: 37.60257, lng: 126.95484 }, 3);

  // 오버레이 열기/닫기
  const { openOverlay, closeOverlay } = useOpenOverlay(mapRef);

  // 토큰 메모
  const token = useMemo(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem("kakaoToken") ||
          localStorage.getItem("naverToken") ||
          localStorage.getItem("googleToken"))) ||
      "",
    []
  );

  // API 통신
  useEffect(() => {
    const controller = new AbortController();

    const run = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("https://test.smu-notice.kr/api/main/event", {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (!data?.success) {
          console.error("데이터 오류:", data?.error);
          return;
        }

        const mapped = (data?.data ?? [])
          .map((ev) => {
            const location =
              ev.location ?? ev.place ?? ev.building ?? ev.buildingName ?? "";
            return {
              id: ev.id,
              title: ev.title ?? ev.name ?? ev.eventTitle ?? "",
              url: ev.url ?? ev.link ?? "#",
              start: ev.startDate ?? ev.start ?? ev.start_time ?? "",
              end: ev.endDate ?? ev.end ?? ev.end_time ?? "",
              isBookmarked: Boolean(ev.isBookmarked),
              buildingId: mapLocationToBuildingId(location, BUILDINGS),
            };
          })
          .filter((ev) => !!ev.buildingId);

        setEvents(mapped);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("API 호출 오류:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    run();
    return () => controller.abort();
  }, [token]);

  const eventsWithBuilding = useMemo(
    () =>
      events
        .map((ev) => ({ ...ev, building: BUILDINGS[ev.buildingId] }))
        .filter((ev) => !!ev.building),
    [events]
  );

  // 지도 빈 곳 클릭 시 닫기
  useMapClickClose(mapRef, () => {
    closeOverlay();
    setSelectedEventId(null);
    setExpandedId(null);
    setHoverBuildingId(null);
  });

  // 마커 생성/동기화
  useMarkers(mapRef, eventsWithBuilding, {
    setHover: setHoverBuildingId,
    onMarkerClick: (ev, pos) => {
      openOverlay(ev);
      setSelectedEventId(ev.id);
      setExpandedId(ev.id);
      mapRef.current?.panTo(pos);
    },
  });

  // 리스트 아이템 클릭
  const handleItemClick = useCallback(
    (ev) => {
      openOverlay(ev);
      setSelectedEventId(ev.id);
      setExpandedId((prev) => (prev === ev.id ? null : ev.id));
    },
    [openOverlay]
  );

  return (
    <Wrapper>
      <Sidebar>
        {loading && <div style={{ padding: 12 }}>불러오는 중...</div>}

        {eventsWithBuilding.map((ev) => {
          const isActive = selectedEventId === ev.id;
          const isExpanded = expandedId === ev.id;
          const letter = ev.building?.id || "?";
          const place = ev?.building?.name || "";

          return (
            <Item
              key={ev.id}
              onClick={() => handleItemClick(ev)}
              onMouseEnter={() => setHoverBuildingId(ev.buildingId)}
              onMouseLeave={() => setHoverBuildingId(null)}
              data-active={isActive}
              data-hover={hoverBuildingId === ev.buildingId}
            >
              <TitleRow>
                <Badge
                  aria-label={ev.building?.name}
                  style={{
                    background:
                      hoverBuildingId === ev.buildingId ? "#87CEEB" : undefined,
                  }}
                >
                  {letter}
                </Badge>
                <TitleText title={ev.title}>{ev.title}</TitleText>
              </TitleRow>
              {isExpanded && (
                <Expanded onClick={(e) => e.stopPropagation()}>
                  <Photo
                    src={getPhoto(ev.buildingId)}
                    alt={`${ev.building?.name || ""} 사진`}
                    loading="lazy"
                  />
                  <ExpandedTitle>
                    <a href={ev.url} target="_blank" rel="noreferrer">
                      {ev.title}
                    </a>
                  </ExpandedTitle>
                  <OverlayPlace>장소: {place}</OverlayPlace>
                  <Dates>
                    <OverlayCalendarIcon src={calendarIcon} alt="calendar" />
                    {ev.start?.replace(/-/g, ".")} ~ {ev.end?.replace(/-/g, ".")}
                    <OverlayBookMarkIcon isBookmarked={ev.isBookmarked} />
                  </Dates>
                </Expanded>
              )}
            </Item>
          );
        })}
      </Sidebar>

      <MapContainer>
        <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />
      </MapContainer>
    </Wrapper>
  );
};

export default MapWithEvents;
