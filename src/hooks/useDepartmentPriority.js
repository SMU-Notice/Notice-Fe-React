import { useEffect, useState } from 'react';
import axios from 'axios';

// /api/mypage/department 호출 → departmentName 배열(중복 제거, 원 순서 유지)
export const useDepartmentPriority = (token) => {
  const [deptPriority, setDeptPriority] = useState([]);

  useEffect(() => {
    if (!token) {
      setDeptPriority([]);
      return;
    }
    const controller = new AbortController();
    const headers = { Authorization: `Bearer ${token}` };

    (async () => {
      try {
        const res = await axios.get(
          'https://test.smu-notice.kr/api/mypage/department',
          { headers, signal: controller.signal }
        );
        const items = Array.isArray(res?.data?.data) ? res.data.data : [];
        const raw = items
          .map((x) => x?.departmentName)
          .filter((s) => typeof s === 'string' && s.trim().length > 0);

        // 중복 제거(첫 등장 순서 유지)
        const seen = new Set();
        const unique = raw.filter((n) => (seen.has(n) ? false : (seen.add(n), true)));

        setDeptPriority(unique);
      } catch (e) {
        if (!axios.isCancel(e)) setDeptPriority([]);
      }
    })();

    return () => controller.abort();
  }, [token]);

  return deptPriority;
};
