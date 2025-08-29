import React, { useEffect, useRef, useState } from "react";
import {Section, CarouselViewport, Track, Card, Thumb} from "./YouTubeCarouselStyle"

export default function YouTubeCarousel() {
  const items = [
    { url: "https://www.youtube.com/watch?v=xxxxxxx1", thumb: "https://i.ytimg.com/vi/xxxxxxx1/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx2", thumb: "https://i.ytimg.com/vi/xxxxxxx2/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx3", thumb: "https://i.ytimg.com/vi/xxxxxxx3/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx4", thumb: "https://i.ytimg.com/vi/xxxxxxx4/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx5", thumb: "https://i.ytimg.com/vi/xxxxxxx5/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx6", thumb: "https://i.ytimg.com/vi/xxxxxxx6/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx7", thumb: "https://i.ytimg.com/vi/xxxxxxx7/hqdefault.jpg" },
    { url: "https://www.youtube.com/watch?v=xxxxxxx8", thumb: "https://i.ytimg.com/vi/xxxxxxx8/hqdefault.jpg" },
  ];

  // 무한 루프 위해 3배 복제
  const tripled = [...items, ...items, ...items];

  // ✅ 이제 처음부터 시작
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  // 자동으로 한 칸씩 이동
  useEffect(() => {
    const id = setInterval(() => setIndex((p) => p + 1), 2000);
    return () => clearInterval(id);
  }, []);

  // 인덱스 변화에 따라 이동 + 끝에서 점프
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${index * 25}%)`;

    // 끝에 도달했을 때 다시 처음으로 순간 점프
    if (index >= items.length * 2) {
      const t = setTimeout(() => {
        track.style.transition = "none";
        setIndex(0);
        track.style.transform = `translateX(0%)`;
      }, 620);
      return () => clearTimeout(t);
    }
  }, [index, items.length]);

  const onCardClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Section>
      <CarouselViewport>
        <Track ref={trackRef}>
          {tripled.map((it, i) => (
            <Card key={`${it.thumb}-${i}`}>
              <Thumb
                src={it.thumb}
                alt={`썸네일 ${((i % items.length) + 1)}`}
                onClick={() => onCardClick(it.url)}
              />
            </Card>
          ))}
        </Track>
      </CarouselViewport>
    </Section>
  );
}
