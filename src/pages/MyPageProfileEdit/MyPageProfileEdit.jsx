import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNav from "../../components/SideBarNav/SideBarNav";

import {
  Container,
  Main,
  Title,
  Block,
  BlockTitle,
  TagList,
  Tag,
  TagRemove,
  DangerBtn,
  BtnRow,
  PillBtn,
  Hint,
} from "./MyPageProfileEditStyle";

const topCategories = [
  "상명",
  "서울",
  "학술정보관 공지",
  "학술정보관 교육",
  "행복생활관",
  "스뮤하우스",
  "대외협력처",
  "일반대학원",
  "공학교육혁신센터",
  "SW중심대학사업단",
  "대학일자리플러스센터",
];

const bottomCategories = [
  "기본",
  "학사",
  "일반",
  "사회봉사",
  "등록장학",
  "학생생활",
  "글로벌",
  "진로취업",
  "비교과",
  "코로나19",
];

const labelToBoardId = {
  상명: 1,
  서울: 2,
  "학술정보관 공지": 3,
  "학술정보관 교육": 4,
  행복생활관: 40,
  스뮤하우스: 41,
  대외협력처: 42,
  일반대학원: 43,
  공학교육혁신센터: 44,
  SW중심대학사업단: 45,
  대학일자리플러스센터: 46,
};

const boardIdToLabel = {
  1: "상명",
  2: "서울",
  3: "학술정보관 공지",
  4: "학술정보관 교육",
  40: "행복생활관",
  41: "스뮤하우스",
  42: "대외협력처",
  43: "일반대학원",
  44: "공학교육혁신센터",
  45: "SW중심대학사업단",
  46: "대학일자리플러스센터",
};

const DEFAULT_BOTTOM = "기본";
const REQUIRES_BOTTOM = new Set(["상명", "서울"]);

const MyPageProfileEdit = () => {
  const navigate = useNavigate();
  const goToBookmark = () => navigate("/MyPageBookMark");
  const goToEmailManage = () => navigate("/MyPageEmailManage");
  const goToProfileEdit = () => navigate("/MyPageProfileEdit");

  const [selectedTop, setSelectedTop] = useState("");
  const [selectedBottom, setSelectedBottom] = useState("");
  const [selectedPairs, setSelectedPairs] = useState([]);

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  const syncSubscriptions = (pairs) => {
    fetch("https://test.smu-notice.kr/api/board-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subscriptions: pairs.map((p) => {
          const [top, bottom] = p.split("/");
          return {
            boardId: labelToBoardId[top] ?? top,
            postTypes: [bottom],
          };
        }),
      }),
    }).catch((err) => console.error("구독 동기화 실패:", err));
  };

  const upsertPair = (topLabel, bottomLabel) => {
    const prefix = `${topLabel}/`;
    const filtered = selectedPairs.filter((p) => !p.startsWith(prefix));
    const next = [...filtered, `${topLabel}/${bottomLabel}`];
    setSelectedPairs(next);
    syncSubscriptions(next);
  };

  useEffect(() => {
    fetch("https://test.smu-notice.kr/api/board-subscription", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((result) => {
        const subs = result.data?.subscriptions || [];
        const pairs = subs.flatMap((sub) => {
          const topLabel = boardIdToLabel[sub.boardId] || sub.boardId;
          const types =
            sub.postTypes && sub.postTypes.length > 0
              ? sub.postTypes
              : [DEFAULT_BOTTOM];
          return types.map((pt) => `${topLabel}/${pt}`);
        });
        setSelectedPairs(pairs);
      })
      .catch((err) => console.error("구독 목록 조회 실패:", err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteAllSubscriptions = () => {
    fetch("https://test.smu-notice.kr/api/board-subscription", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setSelectedPairs([]))
      .catch((err) => console.error("구독 삭제 실패:", err));
  };

  const removePair = (pairToRemove) => {
    const newPairs = selectedPairs.filter((pair) => pair !== pairToRemove);
    setSelectedPairs(newPairs);
    syncSubscriptions(newPairs);
  };

  const handleTopClick = (top) => {
    setSelectedTop(top);
    if (REQUIRES_BOTTOM.has(top)) return;
    upsertPair(top, DEFAULT_BOTTOM);
    setSelectedBottom("");
  };

  const handleBottomClick = (bottom) => {
    setSelectedBottom(bottom);
    if (!selectedTop) return;
    if (REQUIRES_BOTTOM.has(selectedTop)) {
      upsertPair(selectedTop, bottom || DEFAULT_BOTTOM);
      setSelectedBottom("");
    }
  };

  return (
    <Container style={{ "--header-h": "10vh" }}>
      <SidebarNav
        width={100}
        headerHeight="10vh"
        onGoBookmark={goToBookmark}
        onGoEmail={goToEmailManage}
        onGoProfile={goToProfileEdit}
      />

      <Main>
        <Title>메일 관리</Title>

        <Block>
          <BlockTitle>선택된 카테고리</BlockTitle>

          <TagList>
            {selectedPairs.map((pair) => (
              <Tag key={pair}>
                {pair}
                <TagRemove onClick={() => removePair(pair)} aria-label="삭제">
                  ×
                </TagRemove>
              </Tag>
            ))}
          </TagList>

          <DangerBtn onClick={deleteAllSubscriptions}>전체 구독 삭제</DangerBtn>
        </Block>

        <Block>
          <BlockTitle>카테고리 추가</BlockTitle>

          <BtnRow>
            {topCategories.map((cat) => (
              <PillBtn
                key={cat}
                $active={selectedTop === cat}
                onClick={() => handleTopClick(cat)}
                title={
                  REQUIRES_BOTTOM.has(cat)
                    ? "이 카테고리는 바텀 선택이 필요해요"
                    : "바텀 없이 기본으로 바로 추가돼요"
                }
              >
                {cat}
              </PillBtn>
            ))}
          </BtnRow>

          <Hint>
            {selectedTop ? (
              REQUIRES_BOTTOM.has(selectedTop) ? (
                <>
                  * <b>{selectedTop}</b>은(는) 하위 카테고리를 선택해야 합니다.
                </>
              ) : (
                <>
                  * <b>{selectedTop}</b>은(는) 하위 카테고리 선택 없이{" "}
                  <b>{DEFAULT_BOTTOM}</b>으로 자동 추가됩니다.
                </>
              )
            ) : (
              <>
                * 상명/서울은 하위 카테고리를 선택해야 하고, 그 외는{" "}
                <b>{DEFAULT_BOTTOM}</b>으로 추가됩니다.
              </>
            )}
          </Hint>

          {REQUIRES_BOTTOM.has(selectedTop) && (
            <BtnRow $wrap>
              {bottomCategories.map((cat) => (
                <PillBtn
                  key={cat}
                  $active={selectedBottom === cat}
                  onClick={() => handleBottomClick(cat)}
                >
                  {cat}
                </PillBtn>
              ))}
            </BtnRow>
          )}
        </Block>
      </Main>
    </Container>
  );
};

export default MyPageProfileEdit;
