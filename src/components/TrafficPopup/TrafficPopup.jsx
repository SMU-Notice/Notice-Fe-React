import { useEffect } from "react";
import busIcon from "../../assets/bus.svg";
import "./TrafficPopup.css";

export default function TrafficPopup({
  open,
  onClose,
  dateText = "2025-03-12 (수)",
  caption = "오늘의 집회/시위",
}) {
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
      </div>
    </div>
  );
}
