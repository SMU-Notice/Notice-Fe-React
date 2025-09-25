import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: center;
  z-index: 9999;
`;

export const Card = styled.div`
  position: relative;
  background: #0c114c;
  color: #fff;
  width: min(88vw, 320px);
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 360px) {
    padding: 22px;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  opacity: 0.9;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
`;

export const BusImg = styled.img`
  width: 96px;
  height: 96px;
  margin-bottom: 18px;

  @media (max-width: 360px) {
    width: 84px;
    height: 84px;
  }
`;

export const TextBox = styled.div`
  text-align: center;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Apple SD Gothic Neo",
    "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

export const Underline = styled.div`
  font-size: 22px;
  line-height: 1.25;
  text-decoration: underline;
  text-underline-offset: 4px;
  white-space: nowrap;

  @media (max-width: 360px) {
    font-size: 20px;
  }
`;

export const Content = styled.div`
  margin-top: 12px;
  width: 100%;

  ul {
    margin: 0;
    padding-left: 1.1em;
  }

  li + li {
    margin-top: 6px;
  }
`;