import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "./MyPageProfileEdit.css";

const topCategories = ['상명', '서울'];
const bottomCategories = ['학사', '일반', '사회봉사', '등록장학', '학생생활', '글로벌', '진로취업', '비교과', '코로나19'];

const labelToBoardId = { '상명': 1, '서울': 2 };
const boardIdToLabel = { 1: '상명', 2: '서울' };

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

  useEffect(() => {
  fetch('https://test.smu-notice.kr/api/board-subscription', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(result => {
      const subs = result.data?.subscriptions || [];

      const pairs = subs.flatMap(sub => {
        const topLabel = boardIdToLabel[sub.boardId] || sub.boardId;
        return sub.postTypes.map(pt => `${topLabel}/${pt}`);
      });

      setSelectedPairs(pairs);
    })
    .catch(err => console.error('구독 목록 조회 실패:', err));
}, []);


  const addPair = (topLabel, bottomLabel) => {
    const pair = `${topLabel}/${bottomLabel}`;
    if (selectedPairs.includes(pair)) return;

    const newPairs = [...selectedPairs, pair];
    setSelectedPairs(newPairs);

    fetch('https://test.smu-notice.kr/api/board-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subscriptions: newPairs.map(p => {
          const [top, bottom] = p.split('/');
          return {
            boardId: labelToBoardId[top] ?? top,
            postTypes: [bottom],
          };
        }),
      }),
    }).catch(err => console.error("구독 추가 실패:", err));

    setSelectedTop('');
    setSelectedBottom('');
  };

  const deleteAllSubscriptions = () => {
    fetch('https://test.smu-notice.kr/api/board-subscription', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setSelectedPairs([]))
      .catch(err => console.error("구독 삭제 실패:", err));
  };

  const removePair = pairToRemove => {
    const newPairs = selectedPairs.filter(pair => pair !== pairToRemove);
    setSelectedPairs(newPairs);

    fetch('https://test.smu-notice.kr/api/board-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subscriptions: newPairs.map(p => {
          const [top, bottom] = p.split('/');
          return {
            boardId: labelToBoardId[top] ?? top,
            postTypes: [bottom],
          };
        }),
      }),
    }).catch(err => console.error("구독 수정 실패:", err));
  };

  const handleTopClick = category => {
    setSelectedTop(category);
    if (selectedBottom) addPair(category, selectedBottom);
  };

  const handleBottomClick = category => {
    setSelectedBottom(category);
    if (selectedTop) addPair(selectedTop, category);
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
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            marginTop: '10px', marginBottom: '20px',
          }}>
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
              >
                {cat}
              </button>
            ))}
          </div>

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
        </main>
      </div>
    </div>
  );
};

export default MyPageProfileEdit;
