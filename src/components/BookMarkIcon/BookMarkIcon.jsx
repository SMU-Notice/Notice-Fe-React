import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BookmarkWrapper,
  BookmarkButton,
  FolderList,
  FolderItem,
  AddFolder,
  FolderInput,
} from "./BookMarkIconStyle";

import {
  addBookmarkToFolder,
  createFolder,
  renameFolder,
  getFolderPosts,
  getToken,
  removeBookmarkFromFolder,
} from "../../utils/bookmarkService";

/**
 * @param {{ isBookmarked: boolean, postId: number|string, onBookmarkChange?: (next:boolean)=>void }} props
 */
const BookMarkIcon = ({ isBookmarked, postId, onBookmarkChange }) => {
  // 버튼에 즉시 반영될 로컬 상태 (낙관적 업데이트)
  const [bookmarked, setBookmarked] = useState(!!isBookmarked);

  // 폴더/UI 상태
  const [bookmarkFolders, setBookmarkFolders] = useState([]);
  const [showFolders, setShowFolders] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [foldersWithPost, setFoldersWithPost] = useState([]); // 이 게시글을 포함한 폴더 id 배열
  const [newFolderName, setNewFolderName] = useState("");
  const folderListRef = useRef(null);

  // 부모에서 isBookmarked가 바뀔 경우 로컬 상태 동기화
  useEffect(() => {
    setBookmarked(!!isBookmarked);
  }, [isBookmarked]);

  // 폴더 목록 조회 + 현재 게시글이 포함된 폴더 체크
  useEffect(() => {
    const fetchFolders = async () => {
      const token = getToken();
      try {
        const response = await axios.get(`https://test.smu-notice.kr/api/mypage/bookmark`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const folders = response.data.data;
          setBookmarkFolders(folders);

          // 각 폴더의 게시글 조회하여 현재 postId가 포함된 폴더 수집
          const folderCheckPromises = folders.map(async (folder) => {
            const folderPostsData = await getFolderPosts(folder.id); // returns { name, posts }
            const hasPost = folderPostsData?.posts?.some((post) => post.id === postId);
            return hasPost ? folder.id : null;
          });

          const folderIdsWithPost = (await Promise.all(folderCheckPromises)).filter(Boolean);
          setFoldersWithPost(folderIdsWithPost);

          // 포함 여부를 기준으로 bookmarked 동기화
          const nextBookmarked = folderIdsWithPost.length > 0;
          setBookmarked(nextBookmarked);
          onBookmarkChange?.(nextBookmarked);
        } else {
          console.error("폴더 데이터 오류:", response.data.error);
        }
      } catch (error) {
        console.error("폴더 조회 오류:", error);
      }
    };

    if (postId) {
      fetchFolders();
    }
  }, [postId, onBookmarkChange]);

  // 바깥 클릭 시 목록 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (folderListRef.current && !folderListRef.current.contains(event.target)) {
        setShowFolders(false);
        setShowInput(false);
      }
    };

    if (showFolders) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFolders]);

  // 폴더를 클릭했을 때 (해당 폴더에 추가/제거 토글)
  const handleFolderClick = async (folderId) => {
    if (!postId) {
      alert("게시글 ID가 유효하지 않습니다.");
      return;
    }

    const alreadyInThisFolder = foldersWithPost.includes(folderId);

    // ------- 낙관적 업데이트 준비 -------
    const prevFoldersWithPost = foldersWithPost; // 롤백용 스냅샷
    const predictedIds = alreadyInThisFolder
      ? prevFoldersWithPost.filter((id) => id !== folderId)
      : [...prevFoldersWithPost, folderId];

    const predictedBookmarked = predictedIds.length > 0;

    // 즉시 UI에 반영
    setFoldersWithPost(predictedIds);
    setBookmarked(predictedBookmarked);
    onBookmarkChange?.(predictedBookmarked);

    try {
      if (alreadyInThisFolder) {
        const res = await removeBookmarkFromFolder(folderId, postId);
        if (!res.data.success) throw new Error(res.data.error);
        alert("북마크가 해제되었습니다.");
      } else {
        const { data } = await addBookmarkToFolder(folderId, postId);
        if (!data.success) throw new Error(data.error);
        alert("북마크가 폴더에 추가되었습니다.");
      }
      setShowFolders(false);
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
      alert("북마크 처리 중 오류 발생");

      // 실패 시 롤백
      setFoldersWithPost(prevFoldersWithPost);
      const rollbackBookmarked = prevFoldersWithPost.length > 0;
      setBookmarked(rollbackBookmarked);
      onBookmarkChange?.(rollbackBookmarked);
    }
  };

  // 폴더 생성 UI
  const handleAddFolderClick = () => setShowInput(true);
  const handleInputChange = (e) => setNewFolderName(e.target.value);

  // Enter로 폴더 생성 + 이름변경 + 현재 게시글 북마크까지 한번에
  const handleInputKeyDown = async (e) => {
    if (e.key !== "Enter") return;

    const trimmedName = newFolderName.trim();
    if (!trimmedName) return;

    const isDuplicate = bookmarkFolders.some((folder) => folder.name === trimmedName);
    if (isDuplicate || trimmedName.length < 1) {
      alert("다른 폴더와 이름이 다르고 한 글자 이상 입력해주세요");
      return;
    }

    try {
      // 1) 폴더 생성
      const createRes = await createFolder();
      if (!createRes.data.success) throw new Error(createRes.data.error);
      const newFolder = createRes.data.data;

      // 2) 폴더 이름 변경
      const renameRes = await renameFolder(newFolder.id, trimmedName);
      if (!renameRes.data.success) throw new Error(renameRes.data.error);

      // 3) 방금 만든 폴더에 현재 글 북마크 (낙관적 업데이트는 handleFolderClick이 처리)
      await handleFolderClick(newFolder.id);

      // 4) 로컬 폴더 목록 갱신
      const updatedFolder = { ...newFolder, name: trimmedName };
      setBookmarkFolders((prev) => [...prev, updatedFolder]);

      setNewFolderName("");
      setShowInput(false);
    } catch (error) {
      console.error("폴더 생성 또는 이름 변경 오류:", error);
      alert("폴더 생성 중 오류 발생");
    }
  };

  return (
    <BookmarkWrapper>
      {/* 버튼은 로컬 상태를 기준으로 즉시 스타일 반영 */}
      <BookmarkButton
        onClick={() => setShowFolders((prev) => !prev)}
        isBookmarked={bookmarked}
      >
        북마크
      </BookmarkButton>

      {showFolders && (
        <FolderList ref={folderListRef}>
          {bookmarkFolders.map((folder) => (
            <FolderItem key={folder.id} onClick={() => handleFolderClick(folder.id)}>
              {folder.name}
              {foldersWithPost.includes(folder.id) && " ✔️"}
            </FolderItem>
          ))}

          {!showInput ? (
            <AddFolder onClick={handleAddFolderClick}>+ 폴더 생성 후 추가</AddFolder>
          ) : (
            <FolderInput
              autoFocus
              type="text"
              placeholder="폴더명 입력"
              value={newFolderName}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
            />
          )}
        </FolderList>
      )}
    </BookmarkWrapper>
  );
};

export default BookMarkIcon;
