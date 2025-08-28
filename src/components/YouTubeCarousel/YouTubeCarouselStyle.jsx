import styled from "styled-components";

const Section = styled.section`
  width: 100%;
  background: #f5f6fa;
  border-radius: 12px;
  padding: 20px;
  overflow: hidden;
`;

const CarouselViewport = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;

const Track = styled.div`
  display: flex;
  transition: transform 0.6s ease;
`;

const Card = styled.div`
  flex: 0 0 25%;
  padding: 0 8px;
  box-sizing: border-box;
`;

const Thumb = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  aspect-ratio: 16 / 9;
  object-fit: cover;
  cursor: pointer;
`;

export {Section, CarouselViewport, Track, Card, Thumb};