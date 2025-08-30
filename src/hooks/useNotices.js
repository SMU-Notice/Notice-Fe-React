import { useEffect, useState } from 'react';
import { fetchPosts } from '../apis/noticeApi';
import { ITEMS_PER_PAGE, MULTI_FETCH_SIZE } from '../constants/MainBoardDetail';

// 공지 데이터 조회 훅(단일/다중 보드, 서버/로컬 페이지네이션 처리)
export const useNotices = ({
  page,
  setPage,
  effectiveBoardNames,
  postType,
  submittedSearch,
  startDate,
  endDate,
  token,
}) => {
  const [notices, setNotices] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const isMulti = !!(effectiveBoardNames && effectiveBoardNames.length > 1);

        // 단일/전체: 서버 페이지네이션 사용
        if (!isMulti) {
          const boardName =
            effectiveBoardNames && effectiveBoardNames.length === 1
              ? effectiveBoardNames[0]
              : undefined;

          const data = await fetchPosts({
            page: page - 1,
            size: ITEMS_PER_PAGE,
            startDate,
            endDate,
            postType,
            searchTerm: submittedSearch,
            boardName,
            token,
            signal,
          });

          const posts = data.posts || [];
          const tp = data.totalPages || 0;

          setNotices(posts);
          setTotalPages(tp);
          if (tp > 0 && page > tp) setPage(tp);
          if (!posts.length) setErrorMsg('해당 조건에 맞는 공지가 없습니다.');
          return;
        }

        // 다중: 각 보드를 넉넉히 조회 후 합치기 → 최신순 정렬 → 로컬 페이지네이션
        const perBoard = await Promise.all(
          effectiveBoardNames.map((name) =>
            fetchPosts({
              page: 0,
              size: MULTI_FETCH_SIZE,
              startDate,
              endDate,
              postType,
              searchTerm: submittedSearch,
              boardName: name,
              token,
              signal,
            })
          )
        );

        const combined = perBoard.flatMap((d) => d.posts || []);
        combined.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

        if (combined.length === 0) {
          setNotices([]);
          setTotalPages(0);
          setErrorMsg('해당 조건에 맞는 공지가 없습니다.');
          return;
        }

        const localTP = Math.max(1, Math.ceil(combined.length / ITEMS_PER_PAGE));
        if (page > localTP) {
          setPage(localTP);
          setNotices(combined.slice((localTP - 1) * ITEMS_PER_PAGE, localTP * ITEMS_PER_PAGE));
          setTotalPages(localTP);
          return;
        }

        const startIdx = (page - 1) * ITEMS_PER_PAGE;
        setNotices(combined.slice(startIdx, startIdx + ITEMS_PER_PAGE));
        setTotalPages(localTP);
      } catch (err) {
        if (err?.name === 'CanceledError') return;
        setNotices([]);
        setTotalPages(0);
        setErrorMsg('공지 불러오기 실패');
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [
    page,
    effectiveBoardNames,
    postType,
    submittedSearch,
    startDate,
    endDate,
    token,
    setPage,
  ]);

  return { notices, totalPages, loading, errorMsg };
};
