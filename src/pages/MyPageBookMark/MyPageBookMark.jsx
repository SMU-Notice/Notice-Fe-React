import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNav from "../../components/SideBarNav/SideBarNav";
import folderIcon from "../../assets/folder.svg";
import folderplus from "../../assets/folderplus.svg";

import {
  Wrap,
  Main,
  PageTitle,
  Error,
  Loader,
  Grid,
  Card,
  Icon,
  Label,
  HoverMenu,
  MenuBtn,
  Backdrop,
  FolderCapFloat,
  FolderPanel,
  FolderHeader,
  PanelBody,
  PostsCard,
  BodyLoader,
  PostItem,
  Dot,
  PostTitle,
  Meta,
} from "./MyPageBookMarkStyle";

const CREATE_CARD_ID = "__create__";

const formatKST = (dateLike) => {
  try {
    if (!dateLike) return "";
    const dt = typeof dateLike === "string" ? new Date(dateLike) : dateLike;
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    })
      .format(dt)
      .replaceAll(". ", "-")
      .replaceAll(".", "")
      .replace("-", "-")
      .trim();
  } catch {
    return "";
  }
};

const MyPageBookMark = () => {
  const navigate = useNavigate();

  const [folders, setFolders] = useState([]);
  const [openFolderId, setOpenFolderId] = useState(null);
  const [folderContents, setFolderContents] = useState({});
  const [hoveredFolderId, setHoveredFolderId] = useState(null);
  const [loadingFolders, setLoadingFolders] = useState(false);
  const [loadingFolderId, setLoadingFolderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  const apiFetch = useCallback(
    async (url, options = {}) => {
      const controller = new AbortController();
      const { signal } = controller;
      const timeout = setTimeout(() => controller.abort(), 15_000);
      try {
        const res = await fetch(url, {
          ...options,
          headers: { ...(options.headers || {}), ...authHeaders },
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        try {
          return await res.json();
        } catch {
          return null;
        }
      } finally {
        clearTimeout(timeout);
      }
    },
    [authHeaders]
  );

  /* api: folders */
  const fetchFolders = useCallback(async () => {
    if (!token) return;
    setLoadingFolders(true);
    setErrorMsg("");
    try {
      const result = await apiFetch("https://test.smu-notice.kr/api/mypage/bookmark");
      if (result?.success && Array.isArray(result.data)) setFolders(result.data);
      else throw new Error("invalid folder payload");
    } catch (e) {
      console.error(e);
      setErrorMsg("폴더 목록을 불러오는 중 문제가 발생했어요.");
    } finally {
      setLoadingFolders(false);
    }
  }, [token, apiFetch]);

  const createFolder = useCallback(async () => {
    try {
      const result = await apiFetch("https://test.smu-notice.kr/api/mypage/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (result?.success && result.data) setFolders((prev) => [...prev, result.data]);
      else throw new Error("invalid create payload");
    } catch (e) {
      console.error(e);
      setErrorMsg("폴더를 생성하지 못했습니다.");
    }
  }, [apiFetch]);

  const deleteFolder = useCallback(
    async (folderId) => {
      if (!window.confirm("이 폴더를 삭제하시겠습니까?")) return;
      try {
        const result = await apiFetch(
          `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}`,
          { method: "DELETE" }
        );
        if (result?.success) {
          setFolders((prev) => prev.filter((f) => f.id !== folderId));
          setFolderContents((prev) => {
            const c = { ...prev };
            delete c[folderId];
            return c;
          });
          if (openFolderId === folderId) setOpenFolderId(null);
        } else throw new Error("invalid delete payload");
      } catch (e) {
        console.error(e);
        setErrorMsg("폴더를 삭제하지 못했습니다.");
      }
    },
    [apiFetch, openFolderId]
  );

  const renameFolder = useCallback(
    async (folderId, currentName) => {
      const newName = prompt("새 이름을 입력하세요:", currentName);
      if (!newName || newName.trim() === "" || newName === currentName || newName.trim() === "+") return;
      try {
        const result = await apiFetch(
          `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}?newName=${encodeURIComponent(
            newName.trim()
          )}`,
          { method: "PATCH" }
        );
        if (result?.success && result.data) {
          setFolders((prev) => prev.map((f) => (f.id === folderId ? { ...f, name: result.data.name } : f)));
        } else throw new Error("invalid rename payload");
      } catch (e) {
        console.error(e);
        setErrorMsg("폴더 이름을 변경하지 못했습니다.");
      }
    },
    [apiFetch]
  );

  /* api: posts in folder */
  const fetchFolderPosts = useCallback(
    async (folderId) => {
      setLoadingFolderId(folderId);
      try {
        const result = await apiFetch(
          `https://test.smu-notice.kr/api/mypage/bookmark/${folderId}/posts`
        );
        const posts = result?.success && Array.isArray(result?.data?.posts) ? result.data.posts : [];
        setFolderContents((prev) => ({
          ...prev,
          [folderId]: posts.filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i),
        }));
      } catch (e) {
        console.error(e);
        setErrorMsg("게시글을 불러오지 못했습니다.");
        setFolderContents((prev) => ({ ...prev, [folderId]: [] }));
      } finally {
        setLoadingFolderId(null);
      }
    },
    [apiFetch]
  );

  /* actions */
  const handleFolderClick = useCallback(
    async (folderId) => {
      if (openFolderId === folderId) return;
      setOpenFolderId(folderId);
      if (!folderContents[folderId]) await fetchFolderPosts(folderId);
    },
    [openFolderId, folderContents, fetchFolderPosts]
  );

  /* initial load */
  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  /* Close on ESC */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenFolderId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sidebar handlers
  const goToEmailManage = () => navigate("/MyPageEmailManage");
  const goToProfileEdit = () => navigate("/MyPageProfileEdit");

  if (!token) {
    return (
      <Wrap>
        <Main>
          <PageTitle>북마크 관리</PageTitle>
          <p>로그인이 필요합니다.</p>
        </Main>
      </Wrap>
    );
  }

  const opened = openFolderId ? folders.find((f) => f.id === openFolderId) : null;

  return (
    <Wrap>
      <SidebarNav
        width={100}
        headerHeight="10vh"
        onGoBookmark={() => {}}
        onGoEmail={goToEmailManage}
        onGoProfile={goToProfileEdit}
      />

      <Main>
        <PageTitle>북마크 관리</PageTitle>
        {errorMsg && <Error role="alert">{errorMsg}</Error>}

        {loadingFolders ? (
          <Loader role="status" aria-live="polite">폴더를 불러오는 중…</Loader>
        ) : (
          <>
            {opened && (
              <>
                <Backdrop onClick={() => setOpenFolderId(null)} aria-label="패널 닫기" />

                <FolderCapFloat aria-hidden="true">
                  <FolderHeader>
                    <span aria-hidden>★</span>
                    <strong>{opened.name}</strong>
                    <span aria-hidden>★</span>
                  </FolderHeader>
                </FolderCapFloat>

                <FolderPanel
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${opened.name} 폴더 내용`}
                >
                  <PanelBody>
                    {loadingFolderId === opened.id ? (
                      <BodyLoader role="status" aria-live="polite">게시글을 불러오는 중…</BodyLoader>
                    ) : (folderContents[opened.id]?.length ?? 0) > 0 ? (
                      <PostsCard>
                        <ul>
                          {folderContents[opened.id].map((file) => (
                            <PostItem
                              key={`${opened.id}-${file.id}`}
                              onClick={() => navigate(`/board/${file.id}`)}
                              title={file.title}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  navigate(`/board/${file.id}`);
                                }
                              }}
                            >
                              <Dot aria-hidden>•</Dot>
                              <PostTitle>{file.title}</PostTitle>
                              {file.createdAt && <Meta>{formatKST(file.createdAt)}</Meta>}
                            </PostItem>
                          ))}
                        </ul>
                      </PostsCard>
                    ) : (
                      <PostsCard empty>게시글이 없습니다.</PostsCard>
                    )}
                  </PanelBody>
                </FolderPanel>
              </>
            )}

            {!opened && (
              <Grid>
                {[...folders, { id: CREATE_CARD_ID, name: "+" }].map((folder) => {
                  const isCreate = folder.id === CREATE_CARD_ID;
                  return (
                    <Card
                      key={isCreate ? "new" : `f-${folder.id}`}
                      $isPlus={isCreate}
                      onClick={() => (isCreate ? createFolder() : handleFolderClick(folder.id))}
                      onMouseEnter={() => !isCreate && setHoveredFolderId(folder.id)}
                      onMouseLeave={() => !isCreate && setHoveredFolderId(null)}
                      role="button"
                      tabIndex={0}
                      aria-label={isCreate ? "폴더 생성" : `${folder.name} 열기`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          isCreate ? createFolder() : handleFolderClick(folder.id);
                        }
                      }}
                    >
                      <Icon src={isCreate ? folderplus : folderIcon} alt="폴더" />
                      <Label>
                        {isCreate ? "" : folder.name}
                        {!isCreate && hoveredFolderId === folder.id && (
                          <HoverMenu
                            onClick={(e) => e.stopPropagation()}
                            role="menu"
                            aria-label="폴더 메뉴"
                          >
                            <MenuBtn type="button" onClick={() => renameFolder(folder.id, folder.name)}>
                              이름 바꾸기
                            </MenuBtn>
                            <MenuBtn type="button" onClick={() => deleteFolder(folder.id)}>
                              폴더 삭제
                            </MenuBtn>
                          </HoverMenu>
                        )}
                      </Label>
                    </Card>
                  );
                })}
              </Grid>
            )}
          </>
        )}
      </Main>
    </Wrap>
  );
};

export default MyPageBookMark;
