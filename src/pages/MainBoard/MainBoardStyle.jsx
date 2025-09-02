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
  padding: 30px;
  margin-top: 30px;
  position: relative;
  height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 12px;
`;

const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 20px;
  color: #09144D;
  flex: 1;
  text-align: center;
`;

const MoreButton = styled.button`
  background: #09144D;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20%;
  margin-top: 10px;
  margin-left: 30px;
  height: 30px;
  width: 50px;
  white-space: nowrap;
`;


const NoticeList = styled.div`
  width: 60%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const NoticeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
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

const Type = styled.span`
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
  background-color: ${({ noticeType }) => noticeColors[noticeType] ?? "	#4682B4"};
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
  max-width: 85%;  
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

const PostedTodayIcon = styled.img`
  margin-left: 3px;
  margin-top: 2px;
  width: 12px;
  height: 12px;
`

export {Container, TitleWrapper, Title, MoreButton, NoticeList, NoticeItem, Type, NoticeText, DateAndViews, NoticeTitleWrapper, NoticeTitleText, CalendarIcon, ViewIcon, PostedTodayIcon};