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

import {
  CS_GROUP_VALUE,
  CS_GROUP_LABEL,
  mapCsParamToSubType,
} from '../../constants/MainBoardDetail';
import { deriveDeptTag, labelizeBoard } from '../../utils/boardText';
import { useDepartmentPriority } from '../../hooks/useDepartmentPriority';
import {
  useDropdownOptions,
  useEffectiveBoardNames,
  useAutoSelectTopOptionOnce,
} from '../../hooks/useDropdownLogic';

const MainBoardDetail = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || '전체');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [submittedSearch, setSubmittedSearch] = useState(searchParams.get('search') || '');
  const [postType, setPostType] = useState(searchParams.get('postType') || '');
  const [startDate, setStartDate] = useState(searchParams.get('startDate') || '2024-03-01');
  const [endDate, setEndDate] = useState(searchParams.get('endDate') || '2026-02-28');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [selectedBoard, setSelectedBoard] = useState(searchParams.get('board') || '');
  const [csSubType, setCsSubType] = useState(mapCsParamToSubType(searchParams.get('cs')));

  const [pageGroup, setPageGroup] = useState(0);

  const token =
    localStorage.getItem('kakaoToken') ||
    localStorage.getItem('naverToken') ||
    localStorage.getItem('googleToken') ||
    '';

  const currentBoardNames = useMemo(() => {
    const v = TAB_TO_BOARD_NAME[activeTab];
    if (!v) return null;
    return Array.isArray(v) ? v : [v];
  }, [activeTab]);

  // 사용자 학과 우선순위 (중복 제거)
  const deptPriority = useDepartmentPriority(token);

  // 드롭다운 옵션/선택/자동선택
  const dropdownOptions = useDropdownOptions(activeTab, currentBoardNames, deptPriority);
  const effectiveBoardNames = useEffectiveBoardNames(selectedBoard, csSubType, currentBoardNames);
  const { resetAutoSelect } = useAutoSelectTopOptionOnce({
    activeTab,
    dropdownOptions,
    deptPriority,
    selectedBoard,
    setSelectedBoard,
  });

  const currentCategoryOptions = useMemo(
    () => CATEGORY_OPTIONS_MAP[activeTab] || [],
    [activeTab]
  );

  const urlParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set('tab', activeTab);
    if (submittedSearch) params.set('search', submittedSearch);
    if (postType) params.set('postType', postType);
    if (selectedBoard) params.set('board', selectedBoard);
    if (selectedBoard === CS_GROUP_VALUE) {
      params.set('cs', csSubType === '수강신청' ? 'enroll' : 'notice');
    }
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    params.set('page', String(page));
    return params;
  }, [activeTab, submittedSearch, postType, selectedBoard, csSubType, startDate, endDate, page]);

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

  useEffect(() => {
    setSearchParams(urlParams, { replace: true });
  }, [urlParams, setSearchParams]);

  useEffect(() => {
    const spTab = searchParams.get('tab') || '전체';
    const spSearch = searchParams.get('search') || '';
    const spPostType = searchParams.get('postType') || '';
    const rawBoard = searchParams.get('board') || '';
    const spCs = mapCsParamToSubType(searchParams.get('cs'));
    const spStart = searchParams.get('startDate') || '2024-03-01';
    const spEnd = searchParams.get('endDate') || '2026-02-28';
    const spPage = Number(searchParams.get('page')) || 1;

    let spBoard = rawBoard;
    // CS 보드가 직접 들어오면 그룹으로 정규화
    if (spBoard === '컴퓨터과학전공 공지사항' || spBoard === '컴퓨터과학전공 수강신청') {
      spBoard = CS_GROUP_VALUE;
    }

    if (activeTab !== spTab) setActiveTab(spTab);
    if (search !== spSearch) setSearch(spSearch);
    if (submittedSearch !== spSearch) setSubmittedSearch(spSearch);
    if (postType !== spPostType) setPostType(spPostType);
    if (selectedBoard !== spBoard) setSelectedBoard(spBoard);
    if (csSubType !== spCs) setCsSubType(spCs);
    if (startDate !== spStart) setStartDate(spStart);
    if (endDate !== spEnd) setEndDate(spEnd);
    if (page !== spPage) setPage(spPage);
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newGroup = Math.floor((page - 1) / PAGES_PER_GROUP);
    setPageGroup(newGroup);
  }, [page]);

  useEffect(() => {
    if (activeTab !== '학부(과)/전공') return;
    // 자동 선택은 useAutoSelectTopOptionOnce 훅 내부에서 수행됨
  }, [activeTab]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSubmittedSearch(search.trim());
  };

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
                setCsSubType('공지사항');
                setPage(1);
                resetAutoSelect();
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

            {currentBoardNames && currentBoardNames.length > 1 && (
              <>
                <Dropdown
                  value={selectedBoard}
                  onChange={(e) => {
                    setPage(1);
                    setSelectedBoard(e.target.value);
                  }}
                  style={{ marginLeft: '8px' }}
                >
                  <option value="">{activeTab} 전체</option>
                  {dropdownOptions.map((bn) => (
                    <option key={bn} value={bn}>
                      {labelizeBoard(activeTab, bn, CS_GROUP_VALUE, CS_GROUP_LABEL)}
                    </option>
                  ))}
                </Dropdown>

                {activeTab === '학부(과)/전공' && selectedBoard === CS_GROUP_VALUE && (
                  <Dropdown
                    value={csSubType}
                    onChange={(e) => {
                      setPage(1);
                      setCsSubType(e.target.value);
                    }}
                    style={{ marginLeft: '8px', width: '100px', flex: '0 0 100px', minWidth: 0 }}
                  >
                    <option value="공지사항">공지사항</option>
                    <option value="수강신청">수강신청</option>
                  </Dropdown>
                )}
              </>
            )}

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
                const postedToday = !!notice.isPostedToday;

                const deptTag =
                  activeTab === '학부(과)/전공'
                    ? deriveDeptTag(notice.boardName ?? notice.site ?? '')
                    : '';

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
                          {deptTag && `[${deptTag}] `}
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
