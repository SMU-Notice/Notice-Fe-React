// 보드명 → 라벨 가공 유틸

export const deriveDeptTag = (boardName = '') =>
    (boardName || '')
      .replace(
        /\s*(공지사항|공지|학과공지사항|학과공지|학부공지사항|학부공지|공지사항|전공공지사항|전공공지|게시판|수강신청)\s*$/u,
        ''
      )
      .trim();
  
  export const labelizeBoard = (activeTab, name, CS_GROUP_VALUE, CS_GROUP_LABEL) => {
    if (name === CS_GROUP_VALUE) return CS_GROUP_LABEL;
    if (activeTab === '학부(과)/전공' || activeTab === '기숙사') return deriveDeptTag(name);
    return name;
  };