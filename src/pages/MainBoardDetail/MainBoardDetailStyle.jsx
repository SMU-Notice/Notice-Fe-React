import styled from 'styled-components';
import BookMarkIcon from '../../assets/bookmark.svg?react';

const noticeColors = {
  "통합공지": "#09144D", 
  "학술정보관 교육공지": "#00A2E5",
  "학술정보관 공지사항": "#00A2E5",
  "대학일자리플러스센터 프로그램": "#393a96", 
  "SW중심대학사업단 공지사항": "#B51385", 
  "대외협력처 공지사항": "#EE334E", 
  "상명행복생활관 공지사항": "#FFD700",
  "스뮤하우스 공지사항": "#FFD700", 
  "일반대학원 통합대내공지": "	#FF8C00",
  "공학교육혁신센터 공지사항": "#98FB98", 
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 25px;
  text-align: center;
  color: #09144D;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Content = styled.div`
  width: 70%;
  background: #fff;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  background: ${(props) => (props.active ? '#09144D;' : 'white')};
  color: ${(props) => (props.active ? '#fff' : '#000')};
  //border: none;
  margin: -0.05rem;
  padding: 0.7rem 1.05rem;
  //border-radius: 6px;
  border: 1px solid #e4e6df;
  cursor: pointer;
  font-size: 12.7px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #e4e6df;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const SearchBox = styled.div`
  position: relative;
  margin-right: 5px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border: 1px solid #e4e6df;
  border-radius: 4px;
  width: 300px;
  height: 39.5px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #e4e6df;
  width: 150px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Wrap = styled.div`
  display: flex;
`

const Line = styled.div`
  border-bottom: 1.5px solid black;
`
const NoticeList = styled.div`
  background: #fff;
  border-radius: 10px;
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  height: 57px;
  padding: 10px 0;
  transition: background-color 0.1s ease-in-out, font-weight 0.1s ease-in-out;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #f0f8ff;
    font-weight: bold;
    color: #09144D;
  }
`;

const Site = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 8.5px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 5px;
  min-width: 25px;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 50%;
  text-align: center;
  background-color: ${({ noticeType }) => noticeColors[noticeType] ?? "	#4682B4"};
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const NoticeText = styled.div`
  flex: 1;
`;

const DateAndViews = styled.div`
  font-size: 12px;
  color: #777;
`;

const NoticeTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NoticeTitleText = styled.div`
  font-size: 15px;
  font-weight: ${(props) => (props.first ? "bold" : "")};
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;  
`

const CalendarIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 2px;
  transform: translateY(0.8px);
`

const ViewIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
  transform: translateY(1.3px);
`

const ReferenceIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
  transform: translateY(1.3px);
`

const SearchIcon = styled.img`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 8px;
  width: 15px;
  height: 15px;
`

const PostedTodayIcon = styled.img`
  margin-left: 3px;
  width: 15px;
  height: 15px;
  transform: translateY(-2px);
`

const StyledBookMarkIcon = styled(BookMarkIcon)`
  fill: ${({ isBookmarked }) => (isBookmarked ? 'red' : '#ccc')};
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
  transform: translateY(1.5px);
`;

export{Container, Content, Title, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput, Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews, NoticeTitleWrapper, NoticeTitleText, CalendarIcon, ViewIcon, SearchIcon, PostedTodayIcon, StyledBookMarkIcon, ReferenceIcon};
