// import React from "react";
// import "./SocialLoginPage.css";
// import googleLoginImg from "../../assets/googlelogin.svg";
// import naverLoginImg from "../../assets/naverlogin.png";
// import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";

// const SocialLoginPage = ({ onKakaoLogin, onNaverLogin, onGoogleLogin }) => {
//   return (
//     <div className="login-container">
//       {/* 중앙 안내문과 버튼 */}
//       <div className="login-box">
//         <h2>안녕하세요!<br />소셜 계정을 통해 진행해주세요.</h2>

//         <button className="login-button google-img-button" onClick={onKakaoLogin}>
//           <img src={kakaoLoginImg} />
//         </button>
//         <button className="login-button naver" onClick={onNaverLogin}>
//           <img
//             src={naverLoginImg}
//             alt="네이버 로고"
//             style={{ width: '50px', height: '50px', marginRight: '3px', verticalAlign: 'middle' }}
//           />
//           네이버로 계속하기
//         </button>
//         <button className="login-button google" onClick={onGoogleLogin}>
//           <img src={googleLoginImg} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SocialLoginPage;
import React, { useState } from "react";
import "./SocialLoginPage.css";
import googleLoginImg from "../../assets/googlelogin.svg";
import naverLoginImg from "../../assets/naverlogin.png";
import kakaoLoginImg from "../../assets/kakao_login_large_wide.png";

const faqData = [
  {
    question: "어떻게 이용할 수 있나요?",
    answer: "소셜 계정으로 회원가입 및 로그인하시면 이용하실 수 있습니다. (카카오톡/네이버/구글)"
  },
  {
    question: "메일 알림은 어떻게 받나요?",
    answer: "마이페이지의 메일 관리에서 알림 받기를 원하는 게시판을 구독할 수 있어요. 새 글이 올라오면 이메일로 보내드릴게요."
  },
  {
    question: "인기 공지는 어떻게 확인하나요?",
    answer: "조회수를 기준으로 이번 인기 공지 TOP10을 알 수 있어요. 숨은 꿀팁! 인기 있는 공지를 놓치지 마세요!"
  },
  {
    question: "다른 기능은 무엇이 있나요?",
    answer: "구독 게시판 설정, 즐겨찾기, 마이페이지 개인화 설정 등 다양한 기능을 제공하고 있어요."
  }
];

const SocialLoginPage = ({ onKakaoLogin, onNaverLogin, onGoogleLogin }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* 로그인 박스 */}
      <div className="login-container">
        <div className="login-box">
          <h2>
            안녕하세요!
            <br />
            소셜 계정을 통해 진행해주세요.
          </h2>

          <button className="login-button google-img-button" onClick={onKakaoLogin}>
            <img src={kakaoLoginImg} alt="카카오 로그인" />
          </button>

          <button className="login-button naver" onClick={onNaverLogin}>
            <img
              src={naverLoginImg}
              alt="네이버 로고"
              style={{ width: '50px', height: '50px', marginRight: '3px', verticalAlign: 'middle' }}
            />
            네이버로 계속하기
          </button>

          <button className="login-button google" onClick={onGoogleLogin}>
            <img src={googleLoginImg} alt="구글 로그인" />
          </button>
        </div>
      </div>

      {/* FAQ는 login-container 밖에 배치 */}
      <div className="faq-container">
        <h3 className="faq-title">자주 묻는 질문</h3>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {item.question}
              <span className="arrow">{openIndex === index ? "▲" : "▼"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default SocialLoginPage;
