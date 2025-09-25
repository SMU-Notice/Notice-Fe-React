import React from 'react';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2vh;
`;

const PageButton = styled.button`
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ active }) => (active ? '#e1e1e1' : 'transparent')};
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border: 1px solid #ccc;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Pagination = ({ page, setPage, pageGroup, setPageGroup, pagesPerGroup, totalPages }) => {
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <PaginationWrapper>
      {/* 이전 그룹 이동 */}
      <PageButton
        disabled={pageGroup === 0}
        onClick={() => {
          setPageGroup(prev => {
            const newGroup = prev - 1;
            setPage(newGroup * pagesPerGroup + 1);
            window.scrollTo(0, 0);
            return newGroup;
          });
        }}
      >
        ◀
      </PageButton>

      {/* 숫자 버튼 */}
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          active={page === pageNumber}
          onClick={() => {
            setPage(pageNumber);
            window.scrollTo(0, 0);
          }}
        >
          {pageNumber}
        </PageButton>
      ))}

      {/* 다음 그룹 이동 */}
      <PageButton
        disabled={endPage === totalPages}
        onClick={() => {
          setPageGroup(prev => {
            const newGroup = prev + 1;
            setPage(newGroup * pagesPerGroup + 1);
            window.scrollTo(0, 0);
            return newGroup;
          });
        }}
      >
        ▶
      </PageButton>
    </PaginationWrapper>
  );
};

export default Pagination;
