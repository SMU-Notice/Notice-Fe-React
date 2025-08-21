import styled from 'styled-components';
import BookMarkIcon from '../../assets/bookmark.svg?react';

const noticeColors = {
  "통합공지": "#09144D", // 네이비
  "컴퓨터과학과": "#91CE44", // 블루그린
  "학술정보관": "#00A2E5", // 인디고
  "대학일자리센터": "#393a96", // 퍼플
  "SW중심대학사업단": "#B51385", // 오렌지
  "International Student": "#EE334E", // 다크그린
  "학생생활관": "#F9A13A", // 버건디
  "대학원": "#FFDF1C", // 포레스트그린
  "공학교육인증센터": "#009688", // 틸
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
  font-size: 12px;
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
`;

const SearchBox = styled.div`
  position: relative;
  margin-right: 5px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border: 1px solid #e4e6df;
  border-radius: 4px;
  width: 350px;
  height: 39.5px;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #e4e6df;
  width: 150px;
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
  font-size: 9px;
  font-weight: bold;
  margin-right: 10px;
  margin-left: 5px;
  min-width: 25px;
  width: 25px;
  height: 25px;
  color: white;
  border-radius: 50%;
  text-align: center;
  background-color: ${({ noticeType }) => noticeColors[noticeType] ?? "#666"};
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
`;

const NoticeTitleText = styled.div`
  font-size: ${(props) => (props.first ? "20px" : "15px")};
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
`

const ViewIcon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
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
  width: 12px;
  height: 12px;
`

const StyledBookMarkIcon = styled(BookMarkIcon)`
  fill: ${({ isBookmarked }) => (isBookmarked ? 'red' : '#ccc')};
  width: 11px;
  height: 11px;
  margin-right: 2px;
  margin-left: 8px;
`;

export{Container, Content, Title, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput, Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews, NoticeTitleWrapper, NoticeTitleText, CalendarIcon, ViewIcon, SearchIcon, PostedTodayIcon, StyledBookMarkIcon};
