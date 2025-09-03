import styled from "styled-components";
import BookMarkIcon from '../../assets/bookmark.svg?react';

const Container = styled.div`
  max-width: 70%;
  margin: 0 auto;
  margin-top: 4%;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const VerticalDivider = styled.div`
  height: 2.5rem;
  border-left: 1px solid #09144D;
`;

const Site = styled.span`
  font-size: 1.4rem;
  color: gray;
  font-family: 'Cafe24Ssurround', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Line = styled.hr`
  margin: 0.3rem 0;
  border: 1px solid #09144D;
`;

const SubLine = styled.hr`
  margin: 0.5rem 0;
  border: 0.5px solid gray;
`;

const NoticeContainer = styled.div`
  padding: 1rem 0;
`;

const NoticeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const DateAndViews = styled.div`
  display: flex;
  align-items: center;
  color: #777;
  margin: 0.2rem 0;
`;

const CalendarIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 2px;
  margin-right: 5px;
`;

const ViewIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 15px;
  margin-right: 5px;
`;

const ReferenceIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 8px;
  margin-right: 5px;
`;

const NoticeContent = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: 100px;
  white-space: pre-line;
  line-height: 25px;
`;

const NoticePicture = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  white-space: pre-line;
  line-height: 25px;
`;

const NoticeOrigin = styled.a`
  display: block;
  margin-top: 1rem;
  font-weight: bold;
  color: blue;
  font-size: 20px;
`;

const NextNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 15px;
`;

const BeforeNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2rem;
  font-weight: bold;
  font-size: 15px;
`;

const BeforeNoticeTitle = styled.div`
  transition: font-size 0.2s ease-in-out;
  &:hover {
    font-size: 15.5px;
  }
`

const NextNoticeTitle = styled.div`
  transition: font-size 0.2s ease-in-out;
  &:hover {
    font-size: 15.5px;
  }
`


export {Container, Title, VerticalDivider, Site, Line, SubLine, NoticeContainer, NoticeTitle, DateAndViews, CalendarIcon, ViewIcon, NoticeContent, NoticePicture, NoticeOrigin, NextNotice, BeforeNotice, NextNoticeTitle, BeforeNoticeTitle, ReferenceIcon};