import React, { useState } from "react";
import "./FAQaccordion.css";

const defaultItems = [
  { question: "어떻게 이용할 수 있나요?", answer: "소셜 계정으로 회원가입 및 로그인하시면 이용하실 수 있습니다. (카카오톡/네이버/구글)" },
  { question: "메일 알림은 어떻게 받나요?", answer: "마이페이지의 메일 관리에서 알림 받기를 원하는 게시판을 구독할 수 있어요. 새 글이 올라오면 이메일로 보내드릴게요." },
  { question: "인기 공지는 어떻게 확인하나요?", answer: "조회수를 기준으로 이번 인기 공지 TOP10을 알 수 있어요. 숨은 꿀팁! 인기 있는 공지를 놓치지 마세요!" },
  { question: "다른 기능은 무엇이 있나요?", answer: "구독 게시판 설정, 즐겨찾기, 마이페이지 개인화 설정 등 다양한 기능을 제공하고 있어요." }
];

const FAQaccordion = ({ items = defaultItems }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="faq-container">
      <h3 className="faq-title">자주 묻는 질문</h3>
      {items.map((item, idx) => (
        <div key={idx} className="faq-item">
          <div className="faq-question" onClick={() => toggle(idx)}>
            {item.question}
            <span className="arrow">{openIndex === idx ? "▲" : "▼"}</span>
          </div>
          {openIndex === idx && <div className="faq-answer">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default FAQaccordion;
