import { useEffect, useMemo, useRef, useState } from "react";
import busIcon from "../../assets/bus.svg";
import "./TrafficPopup.css";

function getTodayText() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const date = String(today.getDate()).padStart(2, "0");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const day = days[today.getDay()];
  return `${year}-${month}-${date} (${day})`;
}

function getAnySocialToken() {
  const keys = ["kakaoToken", "naverToken", "googleToken"];
  for (const k of keys) {
    const v = localStorage.getItem(k);
    if (v && v !== "null" && v !== "undefined") return v;
  }
  return null;
}

export default function TrafficPopup({
  open,
  onClose,
  dateText = getTodayText(),
  caption = "오늘과 내일의 집회/시위",
}) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const closeBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  const API_BASE = useMemo(
    () => import.meta.env?.VITE_API_BASE || "https://test.smu-notice.kr",
    []
  );

  useEffect(() => {
    if (!open) return;
    lastActiveElRef.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current && closeBtnRef.current.focus(), 0);
    return () => {
      document.body.style.overflow = originalOverflow;
      if (lastActiveElRef.current && lastActiveElRef.current.focus) {
        lastActiveElRef.current.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setMessage("");

        const token = getAnySocialToken();
        if (!token) {
          setEvents([]);
          setMessage("❌ 인증 토큰이 없습니다. 다시 로그인해주세요.");
          return;
        }

        const res = await fetch(`${API_BASE}/api/protest-events`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          signal,
        });

        if (res.status === 401 || res.status === 403) {
          setEvents([]);
          setMessage("인증이 만료되었습니다. 다시 로그인해주세요. (401/403)");
          return;
        }
        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`서버 오류 (${res.status}). ${txt.slice(0, 200)}`);
        }

        const result = await res.json();
        if (!result || result.success !== true) {
          setEvents([]);
          setMessage("서버 오류가 발생했습니다.");
          return;
        }

        const todayEvents = result.data.today.events;
        const tomorrowEvents = result.data.tomorrow.events;
        const combined = todayEvents.concat(tomorrowEvents);

        if (combined.length > 0) {
          setEvents(combined);
          setMessage("");
        } else {
          setEvents([]);
          setMessage("시위 일정이 없습니다.");
        }
      } catch (err) {
        if (signal.aborted) return;
        setEvents([]);
        setMessage("네트워크 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    return () => controller.abort();
  }, [open, API_BASE]);

  if (!open) return null;

  return (
    <div className="pop-overlay" onClick={onClose} aria-hidden>
      <div
        className="pop-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="traffic-title"
        aria-describedby="traffic-body"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="pop-close" onClick={onClose} aria-label="닫기" ref={closeBtnRef}>
          ×
        </button>
        <img src={busIcon} alt="버스 아이콘" className="pop-bus" />
        <div className="pop-text">
          <div className="pop-underline" id="traffic-title">
            {dateText}
          </div>
          <div className="pop-underline">{caption}</div>
        </div>
        <div className="pop-content" id="traffic-body" aria-live="polite">
          {loading && <p>불러오는 중...</p>}
          {!loading && events.length > 0 && (
            <ul>
              {events.map((ev, idx) => (
                <li key={`${ev.location}-${ev.startTime}-${idx}`}>
                  <strong>{ev.location}</strong>
                  <div>
                    {ev.protestDate} · {ev.startTime} ~ {ev.endTime}
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
