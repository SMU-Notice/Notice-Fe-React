import { useEffect, useMemo, useRef } from 'react';
import {
  CS_BOARD_NOTICE,
  CS_BOARD_ENROLL,
  CS_GROUP_VALUE,
  CS_GROUP_LABEL,
  mapSubTypeToBoard,
} from '../constants/MainBoardDetail';
import { deriveDeptTag } from '../utils/boardText';

// 우선순위에 따라 names를 안정 정렬로 재배치
const reorderByDeptPriority = (names, deptNames) => {
  const uniqDept = [...new Set(deptNames)];
  const decorated = names.map((name, idx) => {
    const tag = name === CS_GROUP_VALUE ? CS_GROUP_LABEL : deriveDeptTag(name);
    const prioIndex = uniqDept.indexOf(tag);
    const prio = prioIndex === -1 ? Number.POSITIVE_INFINITY : prioIndex;
    return { name, idx, prio };
  });
  decorated.sort((a, b) => (a.prio !== b.prio ? a.prio - b.prio : a.idx - b.idx));
  return decorated.map(({ name }) => name);
};

// 드롭다운 옵션 생성: CS 병합 + 학과 우선순위 반영
export const useDropdownOptions = (activeTab, currentBoardNames, deptPriority) =>
  useMemo(() => {
    if (!currentBoardNames) return [];
    let names = [...currentBoardNames];

    if (activeTab === '학부(과)/전공') {
      const hasCS = names.includes(CS_BOARD_NOTICE) || names.includes(CS_BOARD_ENROLL);
      if (hasCS) {
        names = names.filter((n) => n !== CS_BOARD_NOTICE && n !== CS_BOARD_ENROLL);
        names.unshift(CS_GROUP_VALUE);
      }
      if (deptPriority.length > 0) {
        names = reorderByDeptPriority(names, deptPriority);
      }
    }
    return names;
  }, [activeTab, currentBoardNames, deptPriority]);

// 선택된 보드/세부유형 → 실제 API 요청용 보드명
export const useEffectiveBoardNames = (selectedBoard, csSubType, currentBoardNames) =>
  useMemo(() => {
    if (selectedBoard === CS_GROUP_VALUE) return [mapSubTypeToBoard(csSubType)];
    if (selectedBoard) return [selectedBoard];
    return currentBoardNames;
  }, [selectedBoard, csSubType, currentBoardNames]);

// 자동 선택(1회): 학과가 있을 때만, selectedBoard 비었을 때만
export const useAutoSelectTopOptionOnce = ({
  activeTab,
  dropdownOptions,
  deptPriority,
  selectedBoard,
  setSelectedBoard,
}) => {
  const didAutoSelectRef = useRef(false);

  useEffect(() => {
    if (activeTab !== '학부(과)/전공') return;
    if (didAutoSelectRef.current) return;
    if (selectedBoard) return;
    if (deptPriority.length === 0) return;
    if (dropdownOptions.length > 0) {
      setSelectedBoard(dropdownOptions[0]);
      didAutoSelectRef.current = true;
    }
  }, [activeTab, dropdownOptions, selectedBoard, deptPriority, setSelectedBoard]);

  const resetAutoSelect = () => {
    didAutoSelectRef.current = false;
  };

  return { resetAutoSelect };
};
