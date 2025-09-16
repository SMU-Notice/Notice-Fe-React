import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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
  BeforeNoticeTitle,
  ReferenceIcon,
  TextBox,
  PictureIcon
} from "./BoardStyle";
import BookMarkIcon from "../../components/BookMarkIcon/BookMarkIcon";
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import referenceIcon from "../../assets/ReferenceIcon.svg";

const Board = () => {
  const [notice, setNotice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setNotFound(false);
    setError(null);

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    axios
      .get(`https://test.smu-notice.kr/api/main/posts/${postId}`, {
        headers,
        signal: controller.signal,
      })
      .then((response) => {
        if (response.data?.success && response.data?.data) {
          setNotice(response.data.data);
        } else {
          // API responded but success flag is false
          setNotice(null);
          setNotFound(true);
        }
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (err?.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err);
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [postId, token]);

  const goToBoard = (id) => {
    if (!id) return;
    navigate(`/board/${id}`);
  };

  if (isLoading) return <p>불러오는 중…</p>;
  if (notFound) return <p>존재하지 않는 게시글입니다.</p>;
  if (error) return <p>게시글을 불러오는 중 오류가 발생했습니다.</p>;
  if (!notice) return null;

  return (
    <Container>
      <Title>
        모든 공지
        <VerticalDivider />
        <Site>{notice.name}</Site>
      </Title>

      <Line />

      <NoticeContainer>
        <NoticeTitle>
          {notice.type ? `[${notice.type}]` : ""}
          {notice.title}
        </NoticeTitle>

        <DateAndViews>
          <CalendarIcon src={calendarIcon} alt="calendar" />
          {notice.postedDate}
          <ViewIcon src={viewIcon} alt="view" />
          {notice.viewCount?.toLocaleString?.() ?? notice.viewCount}
          <BookMarkIcon
            isBookmarked={notice.isBookmarked}
            postId={notice.postId}
          />
          {!!notice.hasReference && (
            <ReferenceIcon src={referenceIcon} alt="reference" />
          )}
        </DateAndViews>

        <SubLine />
        
        <TextBox>
        <img
          src="https://i.imgur.com/BlrEixI.png"
          width={14}
          style={{marginRight: 4 }}
        />
        본문 요약
        </TextBox>

        <NoticeContent>{notice.contentSummary}</NoticeContent>

        <TextBox>
        <PictureIcon/>
        이미지 요약
        </TextBox>
        <NoticePicture>{notice.pictureSummary}</NoticePicture>

        {notice.url && (
          <NoticeOrigin
            href={notice.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ 원문
          </NoticeOrigin>
        )}
      </NoticeContainer>

      <Line />

      <BeforeNotice>
        이전글
        {notice.previousPostTitle && notice.previousPostId && (
          <BeforeNoticeTitle onClick={() => goToBoard(notice.previousPostId)}>
            {notice.previousPostTitle}
          </BeforeNoticeTitle>
        )}
      </BeforeNotice>

      <SubLine />

      <NextNotice>
        다음글
        {notice.nextPostTitle && notice.nextPostId && (
          <NextNoticeTitle onClick={() => goToBoard(notice.nextPostId)}>
            {notice.nextPostTitle}
          </NextNoticeTitle>
        )}
      </NextNotice>

      <SubLine />
    </Container>
  );
};

export default Board;
