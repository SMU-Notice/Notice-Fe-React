import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookMarkPage.css";
import folderIcon from "../../assets/folder.svg";
import folderplus from "../../assets/folderplus.svg";

const MyPageBookMark = () => {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [openFolderIndex, setOpenFolderIndex] = useState(null);
  const [folderContents, setFolderContents] = useState({}); // { [folderId]: Post[] }
  const [hoveredFolderId, setHoveredFolderId] = useState(null);

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchFolders = async () => {
    try {
      const res = await fetch("https://test.smu-notice.kr/api/mypage/bookmark", {
        headers: authHeaders,
      });
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setFolders(result.data);
      }
    } catch (err) {
      console.error("폴더 목록 조회 실패:", err);
    }
  };

  const createFolder = async () => {
    try {
      const res = await fetch("https://test.smu-notice.kr/api/mypage/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
      });
      const result = await res.json();
      if (result.success && result.data) {
        setFolders((prev) => [...prev, result.data]);
      }
    } catch (err) {
      console.error("폴더 생성 실패:", err);
    }
  };

  const deleteFolder = async (folderId) => {
    const confirmed = window.confirm("이 폴더를 삭제하시겠습니까?");
    if (!confirmed) return;
    try {
      const res = await fetch(
        `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}`,
        { method: "DELETE", headers: authHeaders }
      );
      const result = await res.json();
      if (result.success) {
        setFolders((prev) => prev.filter((f) => f.id !== folderId));
        setFolderContents((prev) => {
          const copy = { ...prev };
          delete copy[folderId];
          return copy;
        });
        if (openFolderIndex !== null && folders[openFolderIndex]?.id === folderId) {
          setOpenFolderIndex(null);
        }
      }
    } catch (err) {
      console.error("폴더 삭제 실패:", err);
    }
  };

  const renameFolder = async (folderId, currentName) => {
    const newName = prompt("새 이름을 입력하세요:", currentName);
    if (!newName || newName.trim() === "" || newName === currentName || newName.trim() === "+") {
      return;
    }
    try {
      const res = await fetch(
        `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}?newName=${encodeURIComponent(
          newName.trim()
        )}`,
        { method: "PATCH", headers: authHeaders }
      );
      const result = await res.json();
      if (result.success && result.data) {
        setFolders((prev) =>
          prev.map((f) => (f.id === folderId ? { ...f, name: result.data.name } : f))
        );
      }
    } catch (err) {
      console.error("이름 변경 실패:", err);
    }
  };

  // 응답 구조: { name: string, posts: Post[] }  (없으면 posts는 빈 배열)
  const fetchFolderPosts = async (folderId) => {
    try {
      const res = await fetch(
        `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}/posts`,
        { headers: authHeaders }
      );
      const result = await res.json();

      if (result.success && result.data && Array.isArray(result.data.posts)) {
        return result.data.posts; // posts 배열만 반환
      } else {
        console.warn("게시글 데이터가 배열이 아님:", result.data);
        return [];
      }
    } catch (err) {
      console.error("게시글 조회 실패:", err);
      return [];
    }
  };

  const handleFolderClick = async (idx) => {
    const selectedFolder = folders[idx];
    if (!selectedFolder) return;

    if (openFolderIndex === idx) {
      setOpenFolderIndex(null);
      return;
    }

    setOpenFolderIndex(idx);

    if (!folderContents[selectedFolder.id]) {
      const posts = await fetchFolderPosts(selectedFolder.id);
      // id 기준 중복 제거
      const uniquePosts = posts.filter(
        (p, i, arr) => arr.findIndex((x) => x.id === p.id) === i
      );
      setFolderContents((prev) => ({
        ...prev,
        [selectedFolder.id]: uniquePosts,
      }));
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const goToEmailManage = () => navigate("/MyPageEmailManage");
  const goToProfileEdit = () => navigate("/MyPageProfileEdit");

  if (!token) {
    return (
      <div className="bookmark-container">
        <div className="main">
          <h1 className="title">북마크 관리</h1>
          <p>로그인이 필요합니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmark-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button type="button">북마크</button>
            <button type="button" onClick={goToEmailManage}>
              메일<br />관리
            </button>
            <button type="button" onClick={goToProfileEdit}>
              회원<br />정보
            </button>
          </div>
        </nav>
      </aside>

      <div className="main">
        <h1 className="title">북마크 관리</h1>

        <div className="folder-grid">
          {[...folders, { id: "new", name: "+" }].map((folder, idx) => {
            const isPlus = folder.name === "+";
            const isOpened = openFolderIndex === idx;
            const isHidden = openFolderIndex !== null && !isOpened;

            return (
              <div
                key={isPlus ? "new-folder-card" : `folder-${folder.id}`} // 유니크 키 보장
                className={`folder ${isPlus ? "new-folder" : ""} ${isHidden ? "hidden" : ""} ${
                  isOpened ? "fullscreen" : ""
                }`}
                onClick={(e) => {
                  if (isPlus) {
                    e.stopPropagation();
                    createFolder();
                  } else {
                    handleFolderClick(idx);
                  }
                }}
                onMouseEnter={() => !isPlus && setHoveredFolderId(folder.id)}
                onMouseLeave={() => !isPlus && setHoveredFolderId(null)}
                style={
                  isOpened && !isPlus
                    ? {
                        backgroundImage: `url(${folderIcon})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }
                    : {}
                }
              >
                {!isOpened ? (
                  <>
                    <img
                      src={isPlus ? folderplus : folderIcon}
                      alt="폴더 아이콘"
                      className="folder-icon"
                    />
                    <div className="folder-label">
                      {isPlus ? "" : folder.name}
                      {hoveredFolderId === folder.id && !isPlus && (
                        <div className="hover-menu" onClick={(e) => e.stopPropagation()}>
                          <span onClick={() => renameFolder(folder.id, folder.name)}>
                            이름 바꾸기<br />
                          </span>
                          <span onClick={() => deleteFolder(folder.id)}>폴더 삭제</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="folder-label fullscreen-label">{folder.name}</div>
                    <div className="file-list">
                      {(folderContents[folder.id]?.length ?? 0) > 0 ? (
                        folderContents[folder.id].map((file, i) => (
                          <div
                            key={`${folder.id}-${file.id}-${i}`} // 폴더id+파일id(+index)로 유니크 보장
                            className="file-item"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/board/${file.id}`);
                            }}
                            style={{ cursor: "pointer" }}
                            title={file.title}
                          >
                            📄 {file.title}
                          </div>
                        ))
                      ) : (
                        <div>게시글이 없습니다.</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyPageBookMark;
