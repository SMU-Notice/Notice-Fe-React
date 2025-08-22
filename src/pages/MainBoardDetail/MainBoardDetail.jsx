import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";
import calendarIcon from "../../assets/calendar.svg";
import viewIcon from "../../assets/viewIcon.svg";
import searchIcon from "../../assets/search.svg";
import postedTodayIcon from "../../assets/postedtodayicon.svg";
import Pagination from './Pagination';
import {
  Container, Title, Content, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput,
  Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews,
  NoticeTitleWrapper, NoticeTitleText, CalendarIcon, ViewIcon, SearchIcon as SearchIconImg, PostedTodayIcon, StyledBookMarkIcon
} from "./MainBoardDetailStyle";

const tabs = ['전체', '통합공지', '학과', '학술정보관', '대학일자리센터', 'SW중심대학사업단', 'International Student', '학생생활관', '대학원', '공학교육인증센터'];

const siteNameMap = {
  '통합공지': '통합',
  '컴퓨터과학과': '컴과',
  '학술정보관': '학술',
  '대학일자리센터': '일자리',
  'SW중심대학사업단': 'SW',
  'International Student': '국제',
  '학생생활관': '학생',
  '대학원': '대학원',
  '공학교육인증센터': '공학'
};

const categoryOptionsMap = {
  전체: [],
  통합공지: ["글로벌", "진로취업", "등록/장학", "비교과", "일반"],
  컴퓨터과학과: ["학과 공지", "수강 신청 안내"],
  학술정보관: ["공지사항", "교육공지"],
  대학일자리센터: ["진로/취업프로그램 신청"],
  SW중심대학사업단: ["공지사항"],
  "International Student": ["외국인 유학생 지원"],
  학생생활관: ["학생생활관", "행복생활관"],
  대학원: ["통합 대내 공지"],
  공학교육인증센터: ["공지사항"],
};

const MainBoardDetail = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [notices, setNotices] = useState([]);
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || '전체');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [submittedSearch, setSubmittedSearch] = useState(searchParams.get('search') || '');
  const [postType, setPostType] = useState(searchParams.get('postType') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '2024-03-01');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '2026-02-28');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [pageGroup, setPageGroup] = useState(0);
  const pagesPerGroup = 10;
  const itemsPerPage = 7;
  const [totalPages, setTotalPages] = useState(0);

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  const fetchNotices = async () => {
    try {
      const queryParams = new URLSearchParams({
        page: page - 1,
        size: itemsPerPage,
        ...(activeTab !== '전체' && { boardName: activeTab }),
        ...(postType && { postType }),
        ...(submittedSearch && { searchTerm: submittedSearch }),
        startDate,
        endDate
      });

      const res = await axios.get(`https://test.smu-notice.kr/api/main/board?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setNotices(res.data.data.posts);
        setTotalPages(res.data.data.totalPages);
      } else {
        console.error("데이터 응답 오류:", res.data.error);
      }
    } catch (err) {
      console.error("API 호출 실패:", err);
    }
  };

  useEffect(() => {
    fetchNotices();

    setSearchParams({
      tab: activeTab,
      search: submittedSearch,
      postType,
      startDate,
      endDate,
      page,
    });
  }, [activeTab, postType, submittedSearch, startDate, endDate, page]);

  useEffect(() => {
    // 그룹 페이지와 현재 page 일치 유지
    const newGroup = Math.floor((page - 1) / pagesPerGroup);
    if (newGroup !== pageGroup) {
      setPageGroup(newGroup);
    }
  }, [page, pageGroup]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
  };

  return (
    <Container>
      <Title>모든 공지</Title>
      <Content>
        <Tabs>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              active={tab === activeTab}
              onClick={() => {
                setActiveTab(tab);
                setPostType('');
                setPage(1);
              }}
            >
              {tab}
            </Tab>
          ))}
        </Tabs>

        <FilterRow>
          <label>
            게시 날짜 설정
            <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            ~
            <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>

          <Wrap>
            <form onSubmit={handleSearchSubmit}>
              <SearchBox>
                <SearchInput
                  placeholder=" 검색어를 입력해 주세요."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                  <SearchIconImg src={searchIcon} alt="search" />
                </button>
              </SearchBox>
            </form>

            {categoryOptionsMap[activeTab]?.length > 0 && (
              <Dropdown value={postType} onChange={(e) => setPostType(e.target.value)}>
                <option value="">카테고리 선택</option>
                {categoryOptionsMap[activeTab].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Dropdown>
            )}
          </Wrap>
        </FilterRow>

        <Line />

        <NoticeList>
          {notices.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center" }}>해당 조건에 맞는 공지가 없습니다.</div>
          ) : (
            notices.map((notice, index) => (
              <NoticeItem key={notice.id} onClick={() => goToBoard(notice.id)}>
                <Site noticeType={notice.boardName}>
                  {siteNameMap[notice.site ?? notice.boardName] ?? "학과"}
                </Site>
                <NoticeText>
                  <NoticeTitleWrapper>
                    <NoticeTitleText first={index === 0}  >
                    {notice.postType ? `[${notice.postType}]` : ''}{notice.title}
                    </NoticeTitleText>
                    {notice.isPostedToday && (<PostedTodayIcon src={postedTodayIcon} alt="postedTodayIcon" />)}
                  </NoticeTitleWrapper>
                  <DateAndViews>
                    <CalendarIcon src={calendarIcon} alt="calendar" />{notice.postedDate}
                    <ViewIcon src={viewIcon} alt="view" />{notice.viewCount.toLocaleString()}
                    <StyledBookMarkIcon isBookmarked={notice.isBookmarked} />
                  </DateAndViews>
                </NoticeText>
              </NoticeItem>
            ))
          )}
        </NoticeList>
        <Pagination
        page={page}
        setPage={setPage}
        pageGroup={pageGroup}
        setPageGroup={setPageGroup}
        pagesPerGroup={pagesPerGroup}
        totalPages={totalPages}
      />
      </Content>
    </Container>
  );
};

export default MainBoardDetail;
