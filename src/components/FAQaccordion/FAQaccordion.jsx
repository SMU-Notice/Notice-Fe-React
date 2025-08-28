import React, { useState } from "react";
import {Section, H2, List, Item, QuestionButton, QText, Arrow, AnswerWrap,Answer} from "./FAQaccordionStyle"

const initialFaqs = [
  { q: "어떻게 이용할 수 있나요?", a: "소셜 계정으로 회원가입 및 로그인하시면 이용하실 수 있습니다. (카카오톡/네이버/구글)" },
  { q: "메일 알림은 어떻게 받나요?", a: "마이페이지의 메일 관리에서 알림 받기를 원하는 게시판을 구독할 수 있어요. 새 글이 올라오면 이메일을 보내드릴게요." },
  { q: "인기 공지는 어떻게 확인하나요?", a: "조회수를 기준으로 이달의 인기 공지 TOP10을 확인할 수 있어요. 슴우들에게 인기 있는 공지를 놓치지 마세요!" },
  { q: "다른 기능은 무엇이 있나요?", a: "키워드 검색, 기간 필터, 즐겨찾기(북마크) 등 편리한 기능을 제공해요." },
];

export default function FAQAccordion() {
  const [openMap, setOpenMap] = useState({});
  const toggle = (idx) => setOpenMap((m) => ({ ...m, [idx]: !m[idx] }));

  return (
    <Section>
      <H2>자주 묻는 질문</H2>
      <List>
        {initialFaqs.map((item, idx) => {
          const open = !!openMap[idx];
          return (
            <Item key={idx}>
              <QuestionButton onClick={() => toggle(idx)} aria-expanded={open}>
                <QText>{item.q}</QText>
                <Arrow $open={open} aria-hidden />
              </QuestionButton>
              <AnswerWrap $open={open}>
                <Answer>{item.a}</Answer>
              </AnswerWrap>
            </Item>
          );
        })}
      </List>
    </Section>
  );
}
