import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Container, Title, NoticeList, NoticeItem, Rank, NoticeText, DateAndViews, NoticeTitle, CalendarIcon, ViewIcon } from "./PopularWeeklyBoardStyle";
import calendarIcon from "../../assets/calendar.svg"
import viewIcon from "../../assets/viewIcon.svg"

const PopularWeeklyBoard = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  const token =
  localStorage.getItem("kakaoToken") ||
  localStorage.getItem("naverToken") ||
  localStorage.getItem("googleToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        console.warn("No token available.");
        return;
      }
  
      try {
        const response = await axios.get("https://test.smu-notice.kr/api/main/top", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setNotices(response.data.data);
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

  const numberFmt = new Intl.NumberFormat('ko-KR');

  return (
    <Container>
      <Title>이달의 인기글</Title>
        <NoticeList>
          {notices.slice(0, 7).map((notice, index) => (
            <NoticeItem key={notice.postId} onClick={() => goToBoard(notice.postId)}>
              <Rank first={index === 0}>{index + 1}</Rank>
              <NoticeText>
              <NoticeTitle first={index === 0}>{notice.title}</NoticeTitle>
              <DateAndViews>
              <CalendarIcon src={calendarIcon} alt="calendarIcon" />
              {notice.postedDate}
              <ViewIcon src={viewIcon} alt="viewIcon" />
              {numberFmt.format(Number(notice.viewCount))}
        </DateAndViews>
      </NoticeText>
    </NoticeItem>
  ))}
</NoticeList>
    </Container>
  );
};

export default PopularWeeklyBoard;
