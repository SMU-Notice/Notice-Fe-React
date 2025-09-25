import styled, { css } from "styled-components";

export const Container = styled.div`
  height: calc(100vh - var(--header-h, 0));
  display: flex;
  font-family: "Cafe24Ssurround", sans-serif;
  overflow: hidden;
`;

export const Main = styled.main`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 0 40px 40px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 48px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const Block = styled.div`
  margin-bottom: 30px;
  padding: 3vh 5vh 5vh;
`;

export const BlockTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 25px;
`;

export const TagList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px 0 20px 0;
`;

export const Tag = styled.div`
  background: #1b1d4d;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const TagRemove = styled.button`
  background: transparent;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const DangerBtn = styled.button`
  background-color: #e53935;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const BtnRow = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;

  ${(p) =>
    p.$wrap &&
    css`
      flex-wrap: wrap;
    `}
`;

export const PillBtn = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  ${(p) =>
    p.$active
      ? css`
          background-color: #1b1d4d;
          color: white;
        `
      : css`
          background-color: #ccc;
          color: #333;
        `}
`;

export const Hint = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;
