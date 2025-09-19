import React from "react";
import styled from "styled-components";
import calendarIcon from "../../assets/calendar.svg";
import { CalendarIcon as BaseCalendarIcon , StyledBookMarkIcon as BaseBookMarkIcon } from "../MainBoardDetail/MainBoardDetailStyle";


const OverlayBookMarkIcon = styled(BaseBookMarkIcon)`
  width: 13px;
  height: 13px;
  margin-left: 4px;
  margin-top: 1px;
  transform: translateY(-0.3px);
`;

const OverlayCalendarIcon = styled(BaseCalendarIcon)`
  width: 13px;
  height: 13px;
`;

const OverlayBox = styled.div`
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e6e9f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
  padding: 12px;
  min-width: 240px;
  max-width: 320px;
`;

const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const Badge = styled.span`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #111827;
  color: #fff;
  font-weight: 700;
  font-size: 11px;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const OverlayTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  flex: 0 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  a {
    color: #1f3a93;
    text-decoration: underline;
  }
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const OverlayPlace = styled.div`
  font-size: 12px;
  color: #4b5563;
  margin-bottom: 2px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const OverlayDate = styled.div`
  font-size: 12px;
  color: #6b7280;
  display: flex; 
  align-items: center; 
`;

const formatDateDot = (s) => (s ? s.replace(/-/g, ".") : "");

const EventOverlayBase = ({ ev }) => {
  const title = ev?.title || "";
  const url = ev?.url;
  const place = ev?.building?.name || "";
  const letter = ev?.building?.id || "?";
  const start = formatDateDot(ev?.start);
  const end = formatDateDot(ev?.end);

  return (
    <OverlayBox>
      <OverlayHeader>
        <Badge aria-label={place}>{letter}</Badge>
        <OverlayTitle title={title}>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </OverlayTitle>
      </OverlayHeader>
      <OverlayPlace>장소: {place}</OverlayPlace>
      <OverlayDate>
        <OverlayCalendarIcon src={calendarIcon} alt="calendar" />
        <span>{start} ~ {end}</span>
        <OverlayBookMarkIcon  isBookmarked={ev.isBookmarked} />
      </OverlayDate>
    </OverlayBox>
  );
};

export const EventOverlay = React.memo(EventOverlayBase);
