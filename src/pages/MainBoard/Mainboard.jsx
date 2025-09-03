import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TitleWrapper,
  Title,
  MoreButton,
  NoticeList,
  NoticeItem,
  Type,
  NoticeText,
  DateAndViews,
  NoticeTitleText,
  NoticeTitleWrapper,
  CalendarIcon,
  ViewIcon,
  PostedTodayIcon,
  ReferenceIcon
} from "./MainBoardStyle";

import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import postedTodayIcon from "../../assets/postedtodayicon.svg"
import referenceIcon from '../../assets/ReferenceIcon.svg'

const siteNameMap = {
  통합공지: '메인',
  '컴퓨터과학전공 공지사항': '컴과',
  '학술정보관 교육공지': '학술',
  '학술정보관 공지사항': '학술',
  '대학일자리플러스센터 프로그램': '일자리',
  'SW중심대학사업단 공지사항': 'SW',
  '대외협력처 공지사항': '국제',
  '상명행복생활관 공지사항': '기숙사',
  '스뮤하우스 공지사항': '기숙사',
  '일반대학원 통합대내공지': '대학원',
  '공학교육혁신센터 공지사항': '공학',
};

const MainBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  const token =
  localStorage.getItem("kakaoToken") ||
  localStorage.getItem("naverToken") ||
  localStorage.getItem("googleToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://test.smu-notice.kr/api/main/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (response.data.success) {
          setNotices(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };
  
    fetchData();
  }, [token]);
  

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  const goToMainBoardDetail = () => {
    navigate(`/MainBoardDetail`);
  };


  return (
    <Container>
      <TitleWrapper>
        <div style={{ width: "70px" }} /> {/* 왼쪽 공간 맞춤용 */}
        <Title>모든 공지</Title>
        <MoreButton onClick={goToMainBoardDetail}>더보기</MoreButton>
      </TitleWrapper>
      <NoticeList>
        {notices.map((notice) => (
          <NoticeItem key={notice.id} onClick={() => goToBoard(notice.id)}>
            <Type noticeType={notice.boardName}>{siteNameMap[notice.boardName] ?? '학과'}</Type>
            <NoticeText>
            <NoticeTitleWrapper>
            <NoticeTitleText>
            {notice.postType ? `[${notice.postType}]` : ''}{notice.title}
            </NoticeTitleText>
            {notice.isPostedToday && (<PostedTodayIcon src={postedTodayIcon} alt="postedTodayIcon" />)}
            </NoticeTitleWrapper>
              <DateAndViews>
                <CalendarIcon src={calendarIcon} alt="calendarIcon" />
                {notice.postedDate}
                <ViewIcon src={viewIcon} alt="viewIcon" />
                {Number(notice.viewCount).toLocaleString()}
                {!!notice.hasReference && <ReferenceIcon src={referenceIcon} alt="reference" />}
              </DateAndViews>
            </NoticeText>
          </NoticeItem>
        ))}
      </NoticeList>
    </Container>
  );
};

export default MainBoard;
