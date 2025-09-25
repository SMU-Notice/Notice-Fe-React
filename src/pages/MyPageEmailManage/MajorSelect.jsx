// import React, { useState } from 'react';

// const collegeData = {
//   '자율전공': ['자율전공'],
//   '인문사회과학대학': ['역사콘텐츠전공','지적재산권전공','문헌정보학전공','한일문화콘텐츠전공','공간환경학부','행정학부','가족복지학과','국가안보학과'],
//   '사범대학': ['교육학과', '국어교육과','수학교육과','영어교육과'],
//   '경영경제대학': ['경제금융학부', '경영학부', '글로벌경영학과', '융합경영학과'],
//   '융합공과대학': ['컴퓨터과학전공', '전기공학전공','지능IOT융합전공','게임전공','애니메이션전공','휴먼지능정보공학전공','핀테크전공 · 빅데이터융합전공 ·스마트생산전공','생명공학전공','화공신소재전공','화학에너지전공'],
//   '문화예술대학': ['식품영양학전공','의류학전공','스포츠건강관리전공','무용예술전공','조형예술전공','생활예술전공','음악학부']
// };

// export const MajorSelect = () => {
//   const [selectedCollege, setSelectedCollege] = useState('');
//   const [selectedMajor, setSelectedMajor] = useState('');
//   const [selectedList, setSelectedList] = useState([]);

//   const handleCollegeChange = (e) => {
//     setSelectedCollege(e.target.value);
//     setSelectedMajor('');
//   };

//   const handleMajorChange = (e) => {
//     setSelectedMajor(e.target.value);
//   };
  
//   const handleSubmit = () => {
//     if (!selectedCollege || !selectedMajor) {
//       alert('단과대학과 학과를 모두 선택해주세요.');
//       return;
//     }

//     const newItem = { college: selectedCollege, major: selectedMajor };

//     const isDuplicate = selectedList.some(
//       (item) => item.college === newItem.college && item.major === newItem.major
//     );

//     if (isDuplicate) {
//       alert('이미 추가된 학과입니다.');
//       return;
//     }

//     setSelectedList([...selectedList, newItem]);
//     setSelectedCollege('');
//     setSelectedMajor('');
//   };

//   const handleDelete = (index) => {
//     const updatedList = [...selectedList];
//     updatedList.splice(index, 1);
//     setSelectedList(updatedList);
//   };
  
//   return (
//     <>
//       <h1 style={{ marginBottom: '0px', fontSize: '16px' }}>학과 수정하기</h1>
//       <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
//         <select value={selectedCollege} onChange={handleCollegeChange}>
//           <option value="">단과대학 선택</option>
//           {Object.keys(collegeData).map((college) => (
//             <option key={college} value={college}>
//               {college}
//             </option>
//           ))}
//         </select>

//         <select value={selectedMajor} onChange={handleMajorChange} disabled={!selectedCollege}>
//           <option value="">학과 선택</option>
//           {selectedCollege &&
//             collegeData[selectedCollege].map((major) => (
//               <option key={major} value={major}>
//                 {major}
//               </option>
//             ))}
//         </select>

//         <button
//           onClick={handleSubmit}
//           style={{
//             background: '#1b1d4d',
//             color: '#fff',
//             padding: '4px 8px',
//             borderRadius: '4px'
//           }}
//         >
//           추가하기
//         </button>
//       </div>

//       {/* 추가된 리스트 + 삭제 버튼 */}
//       <ul>
//         {selectedList.map((item, index) => (
//           <li key={index} style={{ marginBottom: '6px' }}>
//             {item.college} - {item.major}{' '}
//             <button
//               onClick={() => handleDelete(index)}
//               style={{
//                 marginLeft: '8px',
//                 backgroundColor: '#e74c3c',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 padding: '4px 8px',
//                 cursor: 'pointer'
//               }}
//             >
//               삭제하기
//             </button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default MajorSelect;

import React, { useState, useEffect } from 'react';

const collegeData1 = {
  '자율전공': ['자율전공'],
  '인문사회과학대학': ['역사콘텐츠전공','지적재산권전공','문헌정보학전공','한일문화콘텐츠전공','공간환경학부','행정학부','가족복지학과','국가안보학과'],
  '사범대학': ['교육학과', '국어교육과','수학교육과','영어교육과'],
  '경영경제대학': ['경제금융학부', '경영학부', '글로벌경영학과', '융합경영학과'],
  '융합공과대학': ['컴퓨터과학전공', '전기공학전공','지능IOT융합전공','게임전공','애니메이션전공','휴먼지능정보공학전공','핀테크전공 · 빅데이터융합전공 ·스마트생산전공','생명공학전공','화공신소재전공','화학에너지전공'],
  '문화예술대학': ['식품영양학전공','의류학전공','스포츠건강관리전공','무용예술전공','조형예술전공','생활예술전공','음악학부']
};

const MajorSelect = () => {
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedList, setSelectedList] = useState([]);

  const token =
    localStorage.getItem('kakaoToken') ||
    localStorage.getItem('naverToken') ||
    localStorage.getItem('googleToken');

  // ✅ 이미 추가된 학과 조회
  useEffect(() => {
    if (!token) return;

    const fetchDepartments = async () => {
      try {
        const res = await fetch('https://test.smu-notice.kr/api/mypage/department', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await res.json();
        if (result.success && result.data) {
          const flatList = result.data.map(({ collegeName, departmentName }) => ({
            college: collegeName,
            major: departmentName,
          }));
          setSelectedList(flatList);
        }
      } catch (err) {
        console.error('학과 조회 실패:', err);
      }
    };

    fetchDepartments();
  }, [token]);

  // ✅ 학과 추가
  const handleSubmit = async () => {
    if (!selectedCollege || !selectedMajor) {
      alert('단과대학과 학과를 모두 선택해주세요.');
      return;
    }

    const newItem = { college: selectedCollege, major: selectedMajor };
    const isDuplicate = selectedList.some(
      (item) => item.college === newItem.college && item.major === newItem.major
    );

    if (isDuplicate) {
      alert('이미 추가된 학과입니다.');
      return;
    }

    try {
      const res = await fetch('https://test.smu-notice.kr/api/mypage/department', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          collegeName: selectedCollege,
          departmentName: selectedMajor,
        }),
      });

      if (!res.ok) throw new Error('추가 실패');
      //alert('학과가 추가되었습니다.');

      setSelectedList([...selectedList, newItem]);
      setSelectedCollege('');
      setSelectedMajor('');
    } catch (err) {
      console.error('학과 추가 실패:', err);
      alert('추가 중 오류 발생');
    }
  };

  const handleCollegeChange = (e) => {
    setSelectedCollege(e.target.value);
    setSelectedMajor('');
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
  };

  const handleDelete = async (index) => {
  const itemToDelete = selectedList[index];
  try {
    const res = await fetch('https://test.smu-notice.kr/api/mypage/department', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        collegeName: itemToDelete.college,
        departmentName: itemToDelete.major,
      }),
    });

    if (!res.ok) throw new Error('삭제 실패');

    const result = await res.json();
    if (result.success) {
      const updatedList = [...selectedList];
      updatedList.splice(index, 1);
      setSelectedList(updatedList);
      //alert('삭제되었습니다.');
    } else {
      alert('삭제 실패: ' + (result.error || '알 수 없는 오류'));
    }
  } catch (err) {
    console.error('학과 삭제 실패:', err);
    alert('삭제 중 오류 발생');
  }
};


  return (
    <>
      <h1 style={{ marginBottom: '0px', fontSize: '25px' }}>학과 수정하기</h1>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
        <select value={selectedCollege} onChange={handleCollegeChange}>
          <option value="">단과대학 선택</option>
          {Object.keys(collegeData1).map((college) => (
            <option key={college} value={college}>{college}</option>
          ))}
        </select>

        <select value={selectedMajor} onChange={handleMajorChange} disabled={!selectedCollege}>
          <option value="">학과 선택</option>
          {selectedCollege &&
            collegeData1[selectedCollege].map((major) => (
              <option key={major} value={major}>{major}</option>
            ))}
        </select>

        <button
          onClick={handleSubmit}
          style={{
            background: '#1b1d4d',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
          }}
        >
          추가하기
        </button>
      </div>

      <ul>
        {selectedList.map((item, index) => (
          <li key={index} style={{ marginBottom: '6px' }}>
            {item.college} - {item.major}{' '}
            <button
              onClick={() => handleDelete(index)}
              style={{
                marginLeft: '8px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
              }}
            >
              삭제하기
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MajorSelect;
