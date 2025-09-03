import styled from 'styled-components';
import { CalendarIcon as BaseCalendarIcon , StyledBookMarkIcon as BaseBookMarkIcon } from "../MainBoardDetail/MainBoardDetailStyle"; 

const OverlayPlace = styled.div`
  font-size: 12px;
  color: #4b5563;
  margin-left: 12px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  height: 100vh;
  padding: 16px;
  background: #f5f6fa; /* 밝은 회색 톤 배경 */
`;

const Sidebar = styled.aside`
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  color: #222;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
`;

const MapContainer = styled.section`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
`;

const Item = styled.button`
  width: 100%;
  text-align: left;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #222;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &[data-active="true"],
  &:hover {
    background: #f0f4ff;
    border-color: #c7d2fe;
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Badge = styled.span`
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #111827;
  color: white;
  font-weight: 800;
  font-size: 15px;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const TitleText = styled.div`
  flex: 1 1 auto;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.25;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Expanded = styled.div`
  margin-top: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: 140px;
  object-fit: cover;
`;

const ExpandedTitle = styled.div`
  padding: 10px 12px 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;

  a {
    color:rgb(23, 60, 140);
    text-decoration: underline;
  }
`;

const Dates = styled.div`
  padding: 3px 12px 12px;
  font-size: 12px;
  color: #4b5563;
  display: flex;
  align-items: center;
`;

const OverlayBookMarkIcon = styled(BaseBookMarkIcon)`
  width: 12px;
  height: 12px;
  margin-left: 4px;
  transform: translateY(0.5px);
`;

const OverlayCalendarIcon = styled(BaseCalendarIcon)`
  width: 12px;
  height: 12px;
  margin-right: 2px;
`;

export {
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
};
