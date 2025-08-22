import { useEffect, useState } from "react";
import busIcon from "../../assets/bus.svg";
import "./TrafficPopup.css";

// 오늘 날짜 포맷 (YYYY-MM-DD (요일))
function getTodayText() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[today.getDay()];

  return `${year}-${month}-${date} (${day})`;
}

export default function TrafficPopup({
  open,
  onClose,
  dateText = getTodayText(),
  caption = "오늘의 집회/시위",
}) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  // API 호출
  useEffect(() => {
    if (!open) return;

    const fetchEvents = async () => {
      try {
        setLoading(true);

        // localStorage에서 토큰 가져오기
        const token =
          localStorage.getItem("kakaoToken") ||
          localStorage.getItem("naverToken") ||
          localStorage.getItem("googleToken");

        if (!token) {
          setMessage("❌ 인증 토큰이 없습니다. 다시 로그인해주세요.");
          setEvents([]);
          setLoading(false);
          return;
        }

        // dateText에서 "YYYY-MM-DD"만 추출 (괄호 제외)
        const queryDate = dateText.split(" ")[0];

        // ✅ 풀 주소 + 토큰 헤더 추가
        const res = await fetch(
          `https://test.smu-notice.kr/api/protest-events?date=${queryDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            mode: "cors",
            credentials: "include",
          }
        );

        const result = await res.json();

        if (result.success) {
          if (result.data.count > 0) {
            setEvents(result.data.events);
            setMessage("");
          } else {
            setEvents([]);
            setMessage(result.data.message || "시위 일정이 없습니다.");
          }
        } else {
          setEvents([]);
          setMessage(result.error?.message || "서버 오류가 발생했습니다.");
        }
      } catch (err) {
        setEvents([]);
        setMessage("네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [open, dateText]);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pop-overlay" onClick={onClose} aria-hidden>
      <div
        className="pop-card"
        role="dialog"
        aria-modal="true"
        aria-label="알림 팝업"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button className="pop-close" onClick={onClose} aria-label="닫기">
          ×
        </button>

        {/* 버스 이미지 */}
        <img src={busIcon} alt="버스 아이콘" className="pop-bus" />

        {/* 텍스트 */}
        <div className="pop-text">
          <div className="pop-underline">{dateText}</div>
          <div className="pop-underline">{caption}</div>
        </div>

        {/* API 결과 */}
        <div className="pop-content">
          {loading && <p>불러오는 중...</p>}
          {!loading && events.length > 0 && (
            <ul>
              {events.map((ev, idx) => (
                <li key={idx}>
                  <strong>{ev.location}</strong>
                  <div>
                    {ev.startTime} ~ {ev.endTime}
                  </div>
                </li>
              ))}
            </ul>
          )}
          {!loading && events.length === 0 && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
