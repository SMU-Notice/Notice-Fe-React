import { useState } from "react";

export const EmailInput = () => {
  const [localPart, setLocalPart] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [selected, setSelected] = useState("직접 입력");

  const commonDomains = ["gmail.com", "naver.com", "daum.net", "직접 입력"];

  const handleRequestAuth = async () => {
    const domain = selected === "직접 입력" ? customDomain : selected;
    const fullEmail = `${localPart}@${domain}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const token =
      localStorage.getItem("kakaoToken") ||
      localStorage.getItem("naverToken") ||
      localStorage.getItem("googleToken");

    if (!emailRegex.test(fullEmail)) {
      alert("유효한 이메일을 입력해주세요.");
      return;
    }

    try {
      const res = await fetch("https://test.smu-notice.kr/api/email/verification/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ email: fullEmail }),
        mode: "cors",
        credentials: "include",
      });

      if (!res.ok) throw new Error("인증 코드 발송 실패");

      // 인증번호 입력 팝업 열기
      const popupUrl = `/email-popup.html?email=${encodeURIComponent(fullEmail)}&token=${encodeURIComponent(token || "")}`;
      const popup = window.open(
        `/email-popup.html?email=${encodeURIComponent(fullEmail)}&token=${encodeURIComponent(token || "")}`,
        "emailVerification",
        `
          width=360,
          height=260,
          left=400,
          top=200,
          toolbar=no,
          location=no,
          menubar=no,
          scrollbars=no,
          resizable=no,
          status=no
        `.replace(/\s+/g, "") // 공백 제거
      );


      if (!popup) {
        alert("팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.");
      }
    } catch (error) {
      alert("❌ 인증 요청 실패: " + (error?.message || error));
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
      <input
        type="text"
        value={localPart}
        onChange={(e) => setLocalPart(e.target.value)}
        placeholder="변경할 메일을 입력해주세요"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          width: "200px",
        }}
      />
      <span>@</span>

      {selected === "직접 입력" ? (
        <input
          type="text"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          placeholder="직접 입력"
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "200px",
          }}
        />
      ) : (
        <input
          type="text"
          value={selected}
          disabled
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f2f2f2",
            width: "200px",
          }}
        />
      )}

      <select
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (e.target.value !== "직접 입력") {
            setCustomDomain("");
          }
        }}
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {commonDomains.map((domain) => (
          <option key={domain} value={domain}>
            {domain}
          </option>
        ))}
      </select>

      <button
        onClick={handleRequestAuth}
        style={{
          padding: "8px 16px",
          backgroundColor: "#0c114b",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        인증번호 받기
      </button>
    </div>
  );
};

export default EmailInput;
