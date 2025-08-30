import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import calendarIcon from '../../assets/calendar.svg';
import viewIcon from '../../assets/viewIcon.svg';
import searchIcon from '../../assets/search.svg';
import postedTodayIcon from '../../assets/postedtodayicon.svg';
import Pagination from './Pagination';
import {
  Container, Title, Content, Tabs, Tab, FilterRow, DateInput, SearchBox, SearchInput,
  Dropdown, Wrap, Line, NoticeList, NoticeItem, Site, NoticeText, DateAndViews,
  NoticeTitleWrapper, NoticeTitleText, CalendarIcon, ViewIcon, SearchIcon as SearchIconImg, PostedTodayIcon, StyledBookMarkIcon
} from './MainBoardDetailStyle';

import {
  TABS,
  TAB_TO_BOARD_NAME,
  SITE_NAME_MAP,
  CATEGORY_OPTIONS_MAP,
  PAGES_PER_GROUP
} from '../../constants/MainBoardDetail';
import { useNotices } from '../../hooks/useNotices';

const MainBoardDetail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL → 상태 초기화
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || '전체');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [submittedSearch, setSubmittedSearch] = useState(searchParams.get('search') || '');
  const [postType, setPostType] = useState(searchParams.get('postType') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '2024-03-01');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '2026-02-28');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [selectedBoard, setSelectedBoard] = useState(searchParams.get('board') || '');

  const [pageGroup, setPageGroup] = useState(0);

  // 인증 토큰
  const token =
    localStorage.getItem('kakaoToken') ||
    localStorage.getItem('naverToken') ||
    localStorage.getItem('googleToken') ||
    '';

  // 현재 탭에 대한 보드 배열(전체 탭은 null)
  const currentBoardNames = useMemo(() => {
    const v = TAB_TO_BOARD_NAME[activeTab];
    if (!v) return null;
    return Array.isArray(v) ? v : [v];
  }, [activeTab]);

  // 실제로 사용할 보드 목록(사이트 선택 시 단일 보드만)
  const effectiveBoardNames = useMemo(() => {
    if (selectedBoard) return [selectedBoard];
    return currentBoardNames;
  }, [selectedBoard, currentBoardNames]);

  // 현재 탭의 카테고리 선택지
  const currentCategoryOptions = useMemo(
    () => CATEGORY_OPTIONS_MAP[activeTab] || [],
    [activeTab]
  );

  // URL 쿼리 파라미터 구성(빈 값 제외)
  const urlParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('tab', activeTab);
    if (submittedSearch) params.set('search', submittedSearch);
    if (postType) params.set('postType', postType);
    if (selectedBoard) params.set('board', selectedBoard);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    params.set('page', String(page));
    return params;
  }, [activeTab, submittedSearch, postType, selectedBoard, startDate, endDate, page]);

  // 공지 데이터 조회(단일/다중 보드 통합)
  const { notices, totalPages, loading, errorMsg } = useNotices({
    page,
    setPage,
    effectiveBoardNames,
    postType,
    submittedSearch,
    startDate,
    endDate,
    token,
  });

  // URL 동기화 및 데이터 조회 트리거
  useEffect(() => {
    setSearchParams(urlParams, { replace: true });
  }, [urlParams, setSearchParams]);

  // 브라우저 뒤로/앞으로 이동 시 URL → 상태 동기화
  useEffect(() => {
    const spTab = searchParams.get('tab') || '전체';
    const spSearch = searchParams.get('search') || '';
    const spPostType = searchParams.get('postType') || '';
    const spBoard = searchParams.get('board') || '';
    const spStart = searchParams.get('startDate') || '2024-03-01';
    const spEnd = searchParams.get('endDate') || '2026-02-28';
    const spPage = Number(searchParams.get('page')) || 1;

    if (activeTab !== spTab) setActiveTab(spTab);
    if (search !== spSearch) setSearch(spSearch);
    if (submittedSearch !== spSearch) setSubmittedSearch(spSearch);
    if (postType !== spPostType) setPostType(spPostType);
    if (selectedBoard !== spBoard) setSelectedBoard(spBoard);
    if (startDate !== spStart) setStartDate(spStart);
    if (endDate !== spEnd) setEndDate(spEnd);
    if (page !== spPage) setPage(spPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 페이지 그룹 동기화
  useEffect(() => {
    const newGroup = Math.floor((page - 1) / PAGES_PER_GROUP);
    setPageGroup(newGroup);
  }, [page]);

  // 검색 제출
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearch(search.trim());
  };

  // 상세 페이지 이동
  const goToBoard = useCallback((id) => navigate(`/board/${id}`), [navigate]);

  return (
    <Container>
      <Title>모든 공지</Title>

      <Content>
        <Tabs>
          {TABS.map((tab) => (
            <Tab
              key={tab}
              active={tab === activeTab}
              onClick={() => {
                setActiveTab(tab);
                setPostType('');
                setSelectedBoard('');
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
            <DateInput
              type="date"
              value={startDate}
              onChange={(e) => {
                setPage(1);
                setStartDate(e.target.value);
              }}
            />
            ~
            <DateInput
              type="date"
              value={endDate}
              onChange={(e) => {
                setPage(1);
                setEndDate(e.target.value);
              }}
            />
          </label>

          <Wrap>
            <form onSubmit={handleSearchSubmit}>
              <SearchBox>
                <SearchInput
                  placeholder=" 검색어를 입력해 주세요."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  type="submit"
                  aria-label="검색"
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <SearchIconImg src={searchIcon} alt="search" />
                </button>
              </SearchBox>
            </form>

            {/* 보드가 2개 이상인 탭에서만 사이트(보드) 드롭다운 표시 */}
            {currentBoardNames && currentBoardNames.length > 1 && (
              <Dropdown
                value={selectedBoard}
                onChange={(e) => {
                  setPage(1);
                  setSelectedBoard(e.target.value);
                }}
                style={{ marginLeft: '8px' }}
              >
                <option value="">{activeTab} 전체</option>
                {currentBoardNames.map((bn) => (
                  <option key={bn} value={bn}>
                    {bn}
                  </option>
                ))}
              </Dropdown>
            )}

            {/* 카테고리(게시글 유형) 드롭다운 */}
            {currentCategoryOptions.length > 0 && (
              <Dropdown
                value={postType}
                onChange={(e) => {
                  setPage(1);
                  setPostType(e.target.value);
                }}
                style={{ marginLeft: '8px' }}
              >
                <option value="">카테고리 선택</option>
                {currentCategoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Dropdown>
            )}
          </Wrap>
        </FilterRow>

        <Line />

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>불러오는 중…</div>
        ) : errorMsg ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>{errorMsg}</div>
        ) : (
          <NoticeList>
            {notices.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                해당 조건에 맞는 공지가 없습니다.
              </div>
            ) : (
              notices.map((notice, index) => {
                const shortSite = SITE_NAME_MAP[notice.site ?? notice.boardName] ?? '학과';
                const views = (notice.viewCount ?? 0).toLocaleString();
                const postedToday = !!notice.isPostedToday; // 백엔드 필드만 사용

                return (
                  <NoticeItem
                    key={notice.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => goToBoard(notice.id)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goToBoard(notice.id)}
                    aria-label={`공지 보기: ${notice.title}`}
                  >
                    <Site noticeType={notice.boardName}>{shortSite}</Site>

                    <NoticeText>
                      <NoticeTitleWrapper>
                        <NoticeTitleText first={index === 0} title={notice.title}>
                          {notice.postType ? `[${notice.postType}] ` : ''}
                          {notice.title}
                        </NoticeTitleText>
                        {postedToday && (
                          <PostedTodayIcon src={postedTodayIcon} alt="postedTodayIcon" />
                        )}
                      </NoticeTitleWrapper>

                      <DateAndViews>
                        <CalendarIcon src={calendarIcon} alt="calendar" />
                        {notice.postedDate}
                        <ViewIcon src={viewIcon} alt="view" />
                        {views}
                        <StyledBookMarkIcon isBookmarked={!!notice.isBookmarked} />
                      </DateAndViews>
                    </NoticeText>
                  </NoticeItem>
                );
              })
            )}
          </NoticeList>
        )}

        <Pagination
          page={page}
          setPage={setPage}
          pageGroup={pageGroup}
          setPageGroup={setPageGroup}
          pagesPerGroup={PAGES_PER_GROUP}
          totalPages={totalPages}
        />
      </Content>
    </Container>
  );
};

export default MainBoardDetail;
