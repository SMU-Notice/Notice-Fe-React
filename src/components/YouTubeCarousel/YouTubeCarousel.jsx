import React, { useEffect, useRef, useState } from "react";
import {Section, CarouselViewport, Track, Card, Thumb} from "./YouTubeCarouselStyle"



export default function YouTubeCarousel() {

  const thumbs = import.meta.glob('../../assets/yt/*.jpg', {
    eager: true,
    query: '?url',
    import: 'default',
  });

  const ids = [
    '유튜브1','유튜브2','유튜브3','유튜브4','유튜브5',
    '유튜브6','유튜브7','유튜브8','유튜브9','유튜브10'
  ];

  const items = ids.map((id) => ({
    url: `https://www.youtube.com/watch?v=${id}`,
    thumb: thumbs[`../../assets/yt/${id}.jpg`],
  }));
  

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
