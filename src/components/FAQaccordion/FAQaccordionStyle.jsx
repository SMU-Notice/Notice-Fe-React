import styled from "styled-components";

const Section = styled.section`
  width: 92%;              
  margin: 40px auto;         
  font-family: system-ui, -apple-system, Segoe UI, Roboto, "Noto Sans KR", sans-serif;
  color: #0b1441;
`;

const H2 = styled.h2`
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 14px;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const List = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const Item = styled.div`
  background: #f2f5fb;
  border-top: 1px solid #e6ecf7;

  &:first-child {
    border-top: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const QuestionButton = styled.button`
  width: 100%;
  background: transparent;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #eaf0fb;
  }
`;

const QText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #0b1441;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

const Arrow = styled.span`
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #0b1441;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};

  &::before {
    content: "▼";
    font-size: 14px;
  }
`;

const AnswerWrap = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "400px" : "0px")};
  transition: max-height 0.22s ease;
  background: #ffffff;
  border-top: 1px solid #e6ecf7;
`;

const Answer = styled.div`
  padding: 14px 18px 16px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
  color: #24324a;
  font-family: 'Paperlogy', 'Apple SD Gothic Neo', 'Malgun Gothic', system-ui, sans-serif;
`;

export {Section, H2, List, Item, QuestionButton, QText, Arrow, AnswerWrap, Answer};