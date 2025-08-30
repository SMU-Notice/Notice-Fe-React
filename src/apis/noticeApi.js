import axios from 'axios';
import { BASE_URL } from '../constants/MainBoardDetail';

// 공지 목록 조회(단일 호출)
export const fetchPosts = async ({
  page,
  size,
  startDate,
  endDate,
  postType,
  searchTerm,
  boardName,
  token,
  signal,
}) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const qp = new URLSearchParams({
    page: String(page ?? 0),
    size: String(size ?? 10),
    startDate,
    endDate,
  });
  if (postType) qp.set('postType', postType);
  if (searchTerm) qp.set('searchTerm', searchTerm);
  if (boardName) qp.set('boardName', boardName);

  const res = await axios.get(`${BASE_URL}?${qp.toString()}`, { headers, signal });
  if (res.data?.success) return res.data.data || { posts: [], totalPages: 0 };
  return { posts: [], totalPages: 0 };
};
