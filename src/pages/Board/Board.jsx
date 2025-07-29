import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  VerticalDivider,
  Site,
  Line,
  SubLine,
  NoticeContainer,
  NoticeTitle,
  DateAndViews,
  CalendarIcon,
  ViewIcon,
  NoticeContent,
  NoticePicture,
  NoticeOrigin,
  NextNotice,
  NextNoticeTitle,
  BeforeNotice,
  BeforeNoticeTitle
} from "./BoardStyle";
import BookMarkIcon from '../../components/BookMarkIcon/BookMarkIcon';
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";

const Board = () => {
  const [notice, setNotice] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const token =
  localStorage.getItem("kakaoToken") ||
  localStorage.getItem("naverToken") ||
  localStorage.getItem("googleToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://test.smu-notice.kr/api/main/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }  
        });

        if (response.data.success) {
          setNotice(response.data.data);
          console.log(response.data.data);
        } else {
          console.error("데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchData();
  }, [postId]);

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  if (!notice) return <p>존재하지 않는 게시글입니다.</p>;

  return (
    <Container>
      <Title>
        모든공지
        <VerticalDivider />
        <Site>{notice.name}</Site>
      </Title>
      <Line />
      <NoticeContainer>
        <NoticeTitle>{notice.type ? `[${notice.type}]` : ''}{notice.title}</NoticeTitle>
        <DateAndViews>
          <CalendarIcon src={calendarIcon} alt="calendar" />{notice.postedDate}
          <ViewIcon src={viewIcon} alt="view" />{notice.viewCount}
          <BookMarkIcon isBookmarked = {notice.isBookmarked} postId={notice.postId}/>
        </DateAndViews>
        <SubLine />
        <NoticeContent>{notice.contentSummary}</NoticeContent>
        <NoticePicture>{notice.pictureSummary}</NoticePicture>
        <NoticeOrigin href={notice.url} target="_blank" rel="noopener noreferrer">
          ▶ 원문
        </NoticeOrigin>
      </NoticeContainer>
      <Line />
      <BeforeNotice>
        이전글
        {notice.previousPostTitle && (<BeforeNoticeTitle key={notice.previousPostId} onClick={() => goToBoard(notice.previousPostId)}>{notice.previousPostTitle}</BeforeNoticeTitle>)}
      </BeforeNotice>
      <SubLine />
      <NextNotice>
        다음글
        {notice.nextPostTitle && (<NextNoticeTitle key={notice.nextPostId} onClick={() => goToBoard(notice.nextPostId)}>{notice.nextPostTitle}</NextNoticeTitle>)}
      </NextNotice>
      <SubLine />
    </Container>
  );
};

export default Board;
