// 탭 라벨
export const TABS = [
    '전체',
    '통합공지',
    '학과',
    '학술정보관',
    '대학일자리센터',
    'SW중심대학사업단',
    'International Student',
    '기숙사',
    '대학원',
    '공학교육인증센터',
  ];
  
  // 탭 라벨 → API boardName 매핑(문자열 또는 문자열 배열)
  export const TAB_TO_BOARD_NAME = {
    전체: null,
    통합공지: '통합공지',
    학과: ['컴퓨터과학전공 공지사항'],
    학술정보관: ['학술정보관 교육공지', '학술정보관 공지사항'],
    대학일자리센터: '대학일자리플러스센터 프로그램',
    SW중심대학사업단: 'SW중심대학사업단 공지사항',
    'International Student': '대외협력처 공지사항',
    기숙사: ['상명행복생활관 공지사항', '스뮤하우스 공지사항'],
    대학원: '일반대학원 통합대내공지',
    공학교육인증센터: '공학교육혁신센터 공지사항',
  };
  
  // 사이트 칩(짧은 이름)
  export const SITE_NAME_MAP = {
    통합공지: '통합',
    컴퓨터과학과: '컴과',
    '학술정보관 교육공지': '학술',
    '학술정보관 공지사항': '학술',
    '대학일자리플러스센터 프로그램': '일자리',
    'SW중심대학사업단 공지사항': 'SW',
    '대외협력처 공지사항': '국제',
    '상명행복생활관 공지사항': '기숙사',
    '스뮤하우스 공지사항': '기숙사',
    '일반대학원 통합대내공지': '대학원',
    '공학교육혁신센터 공지사항': '공학',
  };
  
  // 카테고리(게시글 유형) 선택지
  export const CATEGORY_OPTIONS_MAP = {
    통합공지: ['글로벌', '진로취업', '등록/장학', '비교과', '일반'],
  };
  
  // 페이지네이션 수치
  export const PAGES_PER_GROUP = 10;
  export const ITEMS_PER_PAGE = 7;
  
  // API 기본값
  export const BASE_URL = 'https://test.smu-notice.kr/api/main/board';
  export const MULTI_FETCH_SIZE = 300;
  