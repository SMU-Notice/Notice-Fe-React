import styled, { css, keyframes } from "styled-components";

const SIDEBAR_W = 100;
const PANEL_TOP = 300;
const PANEL_HPAD = 24;

const COLOR = {
  navy: "#0b1a5a",
  tab: "rgb(73, 83, 139)",
  pill: "#5f71c9",
  textDark: "#0c0e3c",
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
    filter: blur(0.8px);
  }
  60% {
    opacity: 1;
    filter: blur(0.3px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
`;

export const Wrap = styled.div`
  display: flex;
  font-family: "Cafe24Ssurround", sans-serif;
  overflow: hidden;
`;

export const Main = styled.div`
  flex: 1;
  padding: 0 40px 40px;
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: 48px;
  margin: 32px 0 8px;
`;

export const Error = styled.div`
  background: #ffe8e8;
  color: #a40000;
  border: 1px solid #ffc9c9;
  padding: 10px 12px;
  border-radius: 8px;
  margin: 8px 40px 0;
`;

export const Loader = styled.div`
  padding: 20px;
`;

export const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px 20px 60px;
  justify-items: center;
  align-content: start;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.2s ease;
  outline: none;

  &:hover {
    transform: translateY(-2px);
  }
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(95, 113, 201, 0.4);
    border-radius: 8px;
  }

  ${(p) =>
    p.$isPlus &&
    css`
      background: none;
      font-size: 36px;
      padding-top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export const Icon = styled.img`
  width: 166px;
  height: 138px;
  margin-bottom: 8px;

  @media (max-width: 520px) {
    width: 120px;
    height: 100px;
  }
`;

export const Label = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  position: relative;
`;

export const HoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  position: absolute;
  left: 110%;
  top: 0;

  background: white;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 6px;
  z-index: 10;

  @media (max-width: 560px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: calc(100% + 6px);
  }
`;

export const MenuBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9;
  background: transparent;
`;

export const FolderCapFloat = styled.div`
  position: absolute;
  left: ${SIDEBAR_W - 73.5}vh;
  top: ${PANEL_TOP - 278}vh;
  width: 50vh;
  height: 20vh;
  z-index: 9;
  pointer-events: none;

  background: ${COLOR.tab};
  animation: ${fadeIn} 0.25s ease-out;
  will-change: filter, opacity, transform;

  --r: 56px;
  --slant: 44px;

  border-top-left-radius: var(--r);
  border-bottom-left-radius: var(--r);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  clip-path: polygon(
    0 0,
    calc(100% - var(--slant)) 0,
    100% 50%,
    calc(100% - var(--slant)) 100%,
    0 100%,
    0 0
  );
`;

export const FolderPanel = styled.div`
  position: absolute;
  left: ${SIDEBAR_W - 87}vh;
  right: ${PANEL_HPAD - 21}vh;
  top: ${PANEL_TOP - 268}vh;
  bottom: 0;
  margin: 0 auto;
  width: 77.2%;

  color: #fff;
  z-index: 10;
  overflow: auto;
  background: ${COLOR.navy};
  border-radius: 0 44px 0 0;
  padding: 60px;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  animation: ${fadeIn} 0.25s ease-out;
  will-change: filter, opacity, transform;
`;

export const FolderHeader = styled.div`
  position: absolute;
  top: 3vh;
  left: 50%;
  transform: translateX(-50%);

  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 14px;
  height: 36px;

  color: #fff;
  border-radius: 12px;
  font-size: 4vh;
  z-index: 100;

  max-width: calc(100% - 24px);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const PanelBody = styled.div`
  display: flex;
  justify-content: center;
`;

export const PostsCard = styled.div`
  width: min(100rem, 105%);
  background: #fff;
  color: ${COLOR.textDark};
  border-radius: 28px;
  padding: 15px 20px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  min-height: 50vh;

  ${(p) =>
    p.empty &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
    `}

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export const BodyLoader = styled.div`
  width: min(880px, 92%);
  color: #fff;
  text-align: center;
`;

export const PostItem = styled.li`
  display: grid;
  grid-template-columns: 20px 1fr auto;
  align-items: center;
  gap: 8px;
  padding: 10px 8px;
  border-bottom: 1px solid #e5e6ef;
  cursor: pointer;
  outline: none;

  &:hover {
    background: #f7f8ff;
  }
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(95, 113, 201, 0.35) inset;
  }
`;

export const Dot = styled.span`
  width: 20px;
  text-align: center;
  font-size: 20px;
  color: ${COLOR.navy};
`;

export const PostTitle = styled.span`
  font-size: 16px;
  line-height: 1.2;
  color: #111;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Meta = styled.span`
  font-size: 12px;
  color: #888;
`;
