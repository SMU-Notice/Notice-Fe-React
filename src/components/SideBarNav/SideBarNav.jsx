import React from "react";
import styled from "styled-components";

const SidebarWrap = styled.aside`
  background: #f7f6fc;

  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width || "100px")};
  flex: 0 0 ${({ width }) => (typeof width === "number" ? `${width}px` : width || "100px")};
  flex-shrink: 0;

  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: sticky;
  top: var(--header-h, 0);
  height: calc(100vh - var(--header-h, 0));

  z-index: 5;
`;

const NavFlex = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const SideBtns = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SideBtn = styled.button`
  font-family: "Cafe24Ssurround", sans-serif;
  font-size: 20px;
  width: 100%;
  height: 40px;
  padding: 4px 8px;
  text-align: center;
  background: #f7f6fc;
  color: #09144d;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(95, 113, 201, 0.4);
  }
`;

export default function SidebarNav({
  width = 100,
  onGoBookmark,
  onGoEmail,
  onGoProfile,
  headerHeight = "0",
}) {
  const headerVar = typeof headerHeight === "number" ? `${headerHeight}px` : headerHeight;

  return (
    <SidebarWrap
      width={width}
      aria-label="마이페이지 사이드바"
      style={{ "--header-h": headerVar }}
    >
      <NavFlex aria-label="마이페이지 내비게이션">
        <SideBtns>
          <NavList>
            <li>
              <SideBtn type="button" onClick={onGoBookmark} aria-label="북마크로 이동">
                북마크
              </SideBtn>
            </li>
            <li>
              <SideBtn type="button" onClick={onGoEmail} aria-label="메일 관리로 이동">
                메일<br />관리
              </SideBtn>
            </li>
            <li>
              <SideBtn type="button" onClick={onGoProfile} aria-label="회원 정보로 이동">
                회원<br />정보
              </SideBtn>
            </li>
          </NavList>
        </SideBtns>
      </NavFlex>
    </SidebarWrap>
  );
}
