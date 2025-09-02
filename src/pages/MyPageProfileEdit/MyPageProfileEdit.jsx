import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./MyPageProfileEdit.css";

const topCategories = ['상명', '서울', '학술정보관 공지', '학술정보관 교육', '행복생활관', '스뮤하우스', '대외협력처', '일반대학원', '공학교육혁신센터','SW중심대학사업단', '대학일자리플러스센터']
const bottomCategories = ['기본', '학사', '일반', '사회봉사', '등록장학', '학생생활', '글로벌', '진로취업', '비교과', '코로나19'];

const labelToBoardId = { '상명': 1, '서울': 2 , '학술정보관 공지': 3, '학술정보관 교육': 4, '행복생활관': 40, '스뮤하우스': 41, '대외협력처': 42, '일반대학원': 43, '공학교육혁신센터': 44,'SW중심대학사업단':45,'대학일자리플러스센터':46};
const boardIdToLabel = { 1: '상명', 2: '서울' , 3: '학술정보관 공지', 4: '학술정보관 교육', 40: '행복생활관', 41: '스뮤하우스', 42: '대외협력처', 43: '일반대학원', 44: '공학교육혁신센터', 45: 'SW중심대학사업단', 46: '대학일자리플러스센터'};
const DEFAULT_BOTTOM = '기본';
const REQUIRES_BOTTOM = new Set(['상명', '서울']); // 이 탑들은 바텀 선택 필요

export const MyPageProfileEdit = () => {
  const navigate = useNavigate();
  const goToBookmark = () => navigate('/MyPageBookMark');
  const goToProfileEdit = () => navigate('/MyPageProfileEdit');

  const [selectedTop, setSelectedTop] = useState('');
  const [selectedBottom, setSelectedBottom] = useState('');
  const [selectedPairs, setSelectedPairs] = useState([]);

  const token =
    localStorage.getItem("kakaoToken") ||
    localStorage.getItem("naverToken") ||
    localStorage.getItem("googleToken");

  // 서버 동기화 공통
  const syncSubscriptions = (pairs) => {
    fetch('https://test.smu-notice.kr/api/board-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subscriptions: pairs.map(p => {
          const [top, bottom] = p.split('/');
          return {
            boardId: labelToBoardId[top] ?? top,
            postTypes: [bottom],
          };
        }),
      }),
    }).catch(err => console.error("구독 동기화 실패:", err));
  };

  // 같은 탑은 한 개 페어만 유지
  const upsertPair = (topLabel, bottomLabel) => {
    const prefix = `${topLabel}/`;
    const filtered = selectedPairs.filter(p => !p.startsWith(prefix));
    const next = [...filtered, `${topLabel}/${bottomLabel}`];
    setSelectedPairs(next);
    syncSubscriptions(next);
  };

  useEffect(() => {
    fetch('https://test.smu-notice.kr/api/board-subscription', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(result => {
        const subs = result.data?.subscriptions || [];
        const pairs = subs.flatMap(sub => {
          const topLabel = boardIdToLabel[sub.boardId] || sub.boardId;
          const types = (sub.postTypes && sub.postTypes.length > 0) ? sub.postTypes : [DEFAULT_BOTTOM];
          return types.map(pt => `${topLabel}/${pt}`);
        });
        setSelectedPairs(pairs);
      })
      .catch(err => console.error('구독 목록 조회 실패:', err));
  }, []);

  const deleteAllSubscriptions = () => {
    fetch('https://test.smu-notice.kr/api/board-subscription', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setSelectedPairs([]))
      .catch(err => console.error("구독 삭제 실패:", err));
  };

  const removePair = (pairToRemove) => {
    const newPairs = selectedPairs.filter(pair => pair !== pairToRemove);
    setSelectedPairs(newPairs);
    syncSubscriptions(newPairs);
  };

  // 탑 클릭 로직
  const handleTopClick = (top) => {
    setSelectedTop(top);
    // 상명/서울이면 바텀 고를 때까지 대기
    if (REQUIRES_BOTTOM.has(top)) {
      return; // 바텀 클릭 때 upsert
    }
    // 그 외 탑은 즉시 기본으로 추가/교체
    upsertPair(top, DEFAULT_BOTTOM);
    setSelectedBottom('');
  };

  // 바텀 클릭 로직 (상명/서울일 때만 의미 있음)
  const handleBottomClick = (bottom) => {
    setSelectedBottom(bottom);
    if (!selectedTop) return;
    // 선택된 탑이 상명/서울일 때만 업서트
    if (REQUIRES_BOTTOM.has(selectedTop)) {
      upsertPair(selectedTop, bottom || DEFAULT_BOTTOM);
      setSelectedBottom(''); // 선택 완료 후 초기화(선택상태 유지 원하면 지워도 됨)
    }
  };

  return (
    <div className="profileedit-container">
      <aside className="sidebar">
        <nav>
          <div className="sidebar-buttons">
            <button onClick={goToBookmark}>북마크</button>
            <button>메일<br />관리</button>
            <button onClick={goToProfileEdit}>회원<br />정보</button>
          </div>
        </nav>
      </aside>

      <div className="main">
        <h2 className="title">메일 관리</h2>

        <div style={{ marginBottom: '30px' }}>
          <h4>선택된 카테고리</h4>
          <div
            style={{
              display: 'flex', gap: '10px', flexWrap: 'wrap',
              marginTop: '10px', marginBottom: '20px',
            }}
          >
            {selectedPairs.map(pair => (
              <div
                key={pair}
                style={{
                  background: '#1b1d4d', color: 'white',
                  padding: '6px 12px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}
              >
                {pair}
                <button
                  onClick={() => removePair(pair)}
                  style={{
                    background: 'transparent', color: 'white',
                    border: 'none', fontWeight: 'bold', cursor: 'pointer',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={deleteAllSubscriptions}
            style={{
              backgroundColor: '#e53935', color: 'white',
              padding: '6px 12px', border: 'none',
              borderRadius: '6px', cursor: 'pointer',
            }}
          >
            전체 구독 삭제
          </button>
        </div>

        <main>
          <h4>카테고리 추가</h4>

          {/* TOP */}
          <div style={{
            display: 'flex', gap: '10px',
            marginBottom: '10px', marginTop: '10px',
          }}>
            {topCategories.map(cat => (
              <button
                key={cat}
                onClick={() => handleTopClick(cat)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: selectedTop === cat ? '#1b1d4d' : '#ccc',
                  color: selectedTop === cat ? 'white' : '#333',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                }}
                title={
                  REQUIRES_BOTTOM.has(cat)
                    ? '이 카테고리는 바텀 선택이 필요해요'
                    : '바텀 없이 기본으로 바로 추가돼요'
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 안내 텍스트 */}
          <div style={{ fontSize: 12, color: '#666', marginBottom: 8 }}>
            {selectedTop
              ? (REQUIRES_BOTTOM.has(selectedTop)
                  ? <>* <b>{selectedTop}</b>은(는) 하위 카테고리를 선택해야 합니다.</>
                  : <>* <b>{selectedTop}</b>은(는) 하위 카테고리 선택 없이 <b>{DEFAULT_BOTTOM}</b>으로 자동 추가됩니다.</>)
              : <>* 상명/서울은 하위 카테고리를 선택해야 하고, 그 외는 <b>{DEFAULT_BOTTOM}</b>으로 추가됩니다.</>
            }
          </div>

          {/* BOTTOM: 상명/서울일 때만 표시 */}
          {REQUIRES_BOTTOM.has(selectedTop) && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {bottomCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleBottomClick(cat)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: selectedBottom === cat ? '#1b1d4d' : '#ccc',
                    color: selectedBottom === cat ? 'white' : '#333',
                    border: 'none', borderRadius: '8px', cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyPageProfileEdit;
